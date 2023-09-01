import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false'
  },
  test: {
    environment: 'jsdom',
    reporters: 'dot',
    setupFiles: [path.resolve(__dirname, '.test/setup.ts')]
  }
});
