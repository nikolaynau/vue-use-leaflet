/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueUseLeaflet',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue-demi', 'leaflet', '@vueuse/core', '@vueuse/shared'],
      output: {
        globals: {
          'vue-demi': 'VueDemi',
          leaflet: 'L',
          '@vueuse/core': 'VueUse',
          '@vueuse/shared': 'VueUse'
        }
      }
    }
  },
  test: {
    environment: 'jsdom'
  }
});
