import { resolve, basename, dirname } from 'path';
import { promises as fs, existsSync } from 'fs';
import fg from 'fast-glob';
import { rimraf } from 'rimraf';
import metadataParser from 'markdown-yaml-metadata-parser';
import { parse } from '@babel/parser';
import generator from '@babel/generator';
import prettier from 'prettier';
import categories from './categories';

const vuepressDir = resolve(__dirname, '../');
const rootDocsDir = resolve(vuepressDir, '../');
const rootDir = resolve(rootDocsDir, '../');
const srcDir = resolve(rootDir, 'src');
const typesDir = resolve(rootDir, 'dist', 'types');

const sidebarFile = resolve(vuepressDir, 'functions-config.js');
const docsDir = resolve(rootDocsDir, 'functions');

const githubSrcUrl =
  'https://github.com/nikolaynau/vue-use-leaflet/blob/master/src/';

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

  await createDocFiles(docsDir, files, [
    addDemoBlock,
    addTypeDeclarationsBlock,
    addSourceBlock
  ]);
  await createDocIndex(docsDir, files);
}

async function createDocFiles(
  basePath: string,
  files: FileEntry[],
  plugins: Array<
    (content: string, file: FileEntry) => string | Promise<string>
  > = []
): Promise<void> {
  for (const file of files) {
    await fs.mkdir(resolve(basePath, file.baseDir));
    let content = (await fs.readFile(file.path)).toString();
    for (const plugin of plugins) {
      content = await plugin(content, file);
    }
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
    order: categories[key] ?? 0,
    files: byCategory[key]
  }));

  result.sort((a, b) => a.order - b.order);
  return result;
}

function addSourceBlock(content: string, file: FileEntry): string {
  content += `
## Source

[Source](${githubSrcUrl}${file.baseDir}/index.ts) • [Demo](${githubSrcUrl}${file.baseDir}/demo.vue) • [Docs](${githubSrcUrl}${file.baseDir}/index.md)
`;

  return content;
}

async function addTypeDeclarationsBlock(
  content: string,
  file: FileEntry
): Promise<string> {
  const typeDeclarations = await getTypeDeclarations(file);

  if (typeDeclarations) {
    content += `
## Type Declarations

\`\`\`ts
${typeDeclarations}
\`\`\`
`;
  }
  return content;
}

async function getTypeDeclarations(
  file: FileEntry
): Promise<string | undefined> {
  const dtsPath = resolve(typesDir, file.baseDir, 'index.d.ts');
  if (existsSync(dtsPath)) {
    let content = (await fs.readFile(dtsPath)).toString();
    content = removeImportDeclarations(content);
    content = await formatCode(content);
    return content.trim();
  }
  return undefined;
}

function removeImportDeclarations(source: string): string {
  const ast = parse(source, {
    sourceType: 'module',
    plugins: [['typescript', { dts: true }]]
  });
  ast.program.body = ast.program.body.filter(
    node => node.type !== 'ImportDeclaration'
  );
  return generator(ast, {}).code;
}

async function formatCode(code: string): Promise<string> {
  const options = await prettier.resolveConfig(rootDir);
  return prettier.format(code, { ...options, parser: 'typescript' });
}

function addDemoBlock(content: string, file: FileEntry): string {
  const demoBlock = `## Demo

<ClientOnly>
  <Demo name="${file.baseDir}" source-url="${githubSrcUrl}${file.baseDir}/demo.vue" />
</ClientOnly>`;
  const pos = content.indexOf('## Usage');
  if (pos > -1) {
    content = `${content.substring(
      0,
      pos
    )}\n\n${demoBlock}\n\n${content.substring(pos)}`;
  }
  return content;
}

run();
