import { Control } from 'leaflet';

export interface DemoEntry {
  title: string;
  url: string;
  component: Function;
}

export function getDemoList(): DemoEntry[] {
  const result: DemoEntry[] = [];
  const list = import.meta.glob('../src/*/demo.vue');

  for (const [fileName, component] of Object.entries(list)) {
    const parts = fileName.split('/');
    const title = parts[parts.length - 2];
    const url = `/${title}`;
    result.push({
      title,
      url,
      component
    });
  }

  return result;
}

export function setDefaultPrefix() {
  Control.Attribution.prototype.options.prefix =
    '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a>';
}
