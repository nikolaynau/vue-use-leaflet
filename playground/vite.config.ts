import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-use-leaflet': resolve(__dirname, '../src/index.ts')
    },
    dedupe: ['vue', 'vue-demi']
  }
});
