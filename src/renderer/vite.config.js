const { defineConfig } = require('vite');

module.exports = defineConfig({
  root: __dirname,
  base: './',
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    sourcemap: true,
    // TODO: compatible Electron-Renderer
    assetsDir: '',
  },
});
