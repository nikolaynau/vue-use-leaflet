import { defaultTheme } from 'vuepress';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { getDirname, path } from '@vuepress/utils';
import themeConfig from './theme-config';

const __dirname = getDirname(import.meta.url);

export default {
  title: 'Vue Use Leaflet',
  description: 'Documentations, API, and FAQ for Vue Use Leaflet',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }]
  ],
  theme: defaultTheme(themeConfig),
  plugins: [
    [
      registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components')
      })
    ]
  ]
};
