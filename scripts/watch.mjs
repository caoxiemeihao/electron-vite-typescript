import fs from 'fs';
import cp from 'child_process';
import electron from 'electron';
import { createServer, normalizePath } from 'vite';
import { watch } from 'chokidar';
import { globs, root, src2dist } from './config.mjs';
import { build } from './build.mjs';

const server = await createServer({ configFile: 'src/renderer/vite.config.js' });

await server.listen();

/** @type {import('net').AddressInfo} */
const info = server.httpServer.address();

// Use in Electron-Main
process.env.VITE_SERVER_URL = `http://${info.address}:${info.port}`;

const watcher = watch(globs, { cwd: root });

watcher.on('add', async file => {
  await build([file]);
  app(file);
});

watcher.on('unlink', async file => {
  fs.unlinkSync(src2dist(file, true));
  app(file);
});

watcher.on('change', async file => {
  await build([file]);
  app(file);
});

/**
 * @param {string} file 
 */
function app(file) {
  const main = normalizePath(file).includes('src/main/');
  const preload = normalizePath(file).includes('src/preload/');
  if (main) {
    if (process.APP) {
      process.APP.kill();
      process.APP.removeAllListeners();
    }
    process.APP = cp.spawn(electron, ['.'], { stdio: 'inherit' });
    process.APP.once('exit', process.exit);
  } else if (preload) {
    server.ws.send({ type: 'full-reload' });
  }
}
