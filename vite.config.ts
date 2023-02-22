import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueUseLeaflet',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue-demi',
        'leaflet',
        '@vueuse/core',
        '@vueuse/shared',
        '@vueuse/math'
      ],
      output: {
        globals: {
          'vue-demi': 'VueDemi',
          leaflet: 'L',
          '@vueuse/core': 'VueUse',
          '@vueuse/shared': 'VueUse',
          '@vueuse/math': 'VueUse'
        }
      }
    }
  }
});
