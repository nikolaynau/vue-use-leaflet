import functionsSidebar from "./functions-sidebar";

export default {
  logo: '/favicon.svg',
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
    '/functions/': functionsSidebar
  }
};
