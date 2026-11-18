import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function spaFallbackPlugin() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const distDir = resolve(process.cwd(), 'dist');
      const indexFile = resolve(distDir, 'index.html');
      const notFoundFile = resolve(distDir, '404.html');
      if (existsSync(indexFile)) {
        copyFileSync(indexFile, notFoundFile);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  appType: 'spa',
  base: '/',
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
  preview: {
    port: 4000,
    strictPort: false,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
