import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/main.js',
      output: {
        entryFileNames: 'content.js'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [
    {
      name: 'copy-manifest',
      closeBundle: () => {
        copyFileSync('manifest.json', 'dist/manifest.json');
      }
    }
  ]
});
