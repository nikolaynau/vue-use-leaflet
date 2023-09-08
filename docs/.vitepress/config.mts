import { defineConfig } from 'vitepress';
import sidebarFunctions from './functions';

export default defineConfig({
  title: 'VueUseLeaflet',
  description: 'Collection of Vue Composition Utilities for Leaflet',

  head: [
    [
      'link',
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '32x32' }
    ]
  ],

  lang: 'en-US',
  lastUpdated: true,

  markdown: { attrs: { disable: true } },

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nikolaynau/vue-use-leaflet' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Nikolay Naumenkov'
    },

    search: {
      provider: 'local'
    },

    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide(),
      '/functions/': sidebarFunctions
    }
  }
});

function nav() {
  return [
    {
      text: 'Guide',
      link: '/guide/'
    },
    {
      text: 'Functions',
      link: '/functions/'
    }
  ];
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        {
          text: 'Getting Started',
          link: '/guide/'
        }
      ]
    }
  ];
}
