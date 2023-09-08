import functionsConfig from "./functions-config";

export default {
  logo: '/favicon.svg',
  sidebarDepth: 0,
  contributors: false,
  navbar: [
    { text: 'Guide', link: '/guide/quick-start.md' },
    { text: 'Functions', link: '/functions/' },
    { text: 'GitHub', link: 'https://github.com/nikolaynau/vue-use-leaflet' }
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Getting Started',
        collapsable: true,
        children: ['/guide/quick-start.md']
      }
    ],
    '/functions/': functionsConfig
  }
};
