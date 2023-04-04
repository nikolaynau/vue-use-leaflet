import { resolve, basename, dirname } from 'path';
import { promises as fs, existsSync } from 'fs';
import fg from 'fast-glob';
import rimraf from 'rimraf';
import metadataParser from 'markdown-yaml-metadata-parser';

const vuepressDir = resolve(__dirname, '../');
const rootDocsDir = resolve(vuepressDir, '../');
const rootDir = resolve(rootDocsDir, '../');
const srcDir = resolve(rootDir, 'src');

const sidebarFile = resolve(vuepressDir, 'functions-config.js');
const docsDir = resolve(rootDocsDir, 'functions');

interface FileEntry {
  path: string;
  baseDir: string;
  metadata: Metadata;
}

interface CategoryEntry {
  name: string;
  order: number;
  files: FileEntry[];
}

type Metadata = {
  category?: string;
};

const CATEGORIES = Object.freeze({
  Map: 1,
  Control: 2
});

async function run() {
  await cleanDocs();
  await cleanSidebar();

  const files = await findFiles();
  await generateDocs(files);
  await generateSidebarConfig(files);
}

async function findFiles(): Promise<FileEntry[]> {
  const files = await fg('**/index.md', {
    absolute: true,
    cwd: srcDir
  });
  const result: FileEntry[] = [];
  for (const file of files) {
    result.push({
      path: file,
      metadata: await getMetadata(file),
      baseDir: basename(dirname(file))
    });
  }
  return result;
}

function cleanDocs() {
  return rimraf(docsDir);
}

function cleanSidebar() {
  return fs.writeFile(sidebarFile, 'export default [];');
}

async function getMetadata(path: string): Promise<Metadata> {
  const content = (await fs.readFile(path)).toString();
  const result = metadataParser(content);
  return result.metadata;
}

async function generateDocs(files: FileEntry[]) {
  if (!existsSync(docsDir)) {
    await fs.mkdir(docsDir);
  }

  await createDocFiles(docsDir, files);
  await createDocIndex(docsDir, files);
}

async function createDocFiles(
  basePath: string,
  files: FileEntry[]
): Promise<void> {
  for (const file of files) {
    await fs.mkdir(resolve(basePath, file.baseDir));
    const content = (await fs.readFile(file.path)).toString();
    await fs.writeFile(resolve(basePath, file.baseDir, 'index.md'), content);
  }
}

function createDocIndex(basePath: string, files: FileEntry[]): Promise<void> {
  const byCategory = getSortedByCategories(files);
  const fileContent = `# Functions

${byCategory
  .map(
    item =>
      `### ${item.name}\n\n${item.files
        .map(file => `[${file.baseDir}](/functions/${file.baseDir}/index.md)`)
        .join('    \n')}`
  )
  .join('\n\n')}
`;
  return fs.writeFile(resolve(basePath, 'index.md'), fileContent);
}

function generateSidebarConfig(files: FileEntry[]): Promise<void> {
  const byCategory = getSortedByCategories(files);
  const config = byCategory.map(item => ({
    text: item.name,
    children: item.files.map(file => `/functions/${file.baseDir}/index.md`)
  }));
  const fileContent = `export default ${JSON.stringify(config, null, 2)}`;
  return fs.writeFile(sidebarFile, fileContent);
}

function getSortedByCategories(files: FileEntry[]): CategoryEntry[] {
  const byCategory = files.reduce((res, val) => {
    if (val.metadata.category) {
      if (!res[val.metadata.category]) {
        res[val.metadata.category] = [];
      }
      res[val.metadata.category].push(val);
    }
    return res;
  }, {} as Record<string, FileEntry[]>);

  const result = Object.keys(byCategory).map<CategoryEntry>(key => ({
    name: key,
    order: CATEGORIES[key] ?? 0,
    files: byCategory[key]
  }));

  result.sort((a, b) => a.order - b.order);
  return result;
}

run();