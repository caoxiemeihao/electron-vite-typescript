import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const CJS = cjs(import.meta.url);

/**
 * @see https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
export const colours = {
  cyan: '\x1b[36m%s\x1b[0m',
  yellow: '\x1b[33m%s\x1b[0m',
};

export const root = path.join(CJS.__dirname, '..');

export const globs = [
  'src/main/**/*.{ts,js}',
  'src/preload/**/*.{ts,js}',
];

/**
 * @param {string} p 
 * @param {boolean} replacTS 
 */
export function src2dist(p, replacTS) {
  const distpath = p.replace('src', 'dist');
  return replacTS ? distpath.replace('.ts', '.js') : distpath;
}

/**
 * @param {string} url 
 */
export function cjs(url) {
  const __filename = fileURLToPath(url);
  return {
    __filename,
    __dirname: path.dirname(__filename),
    require: createRequire(url),
  };
}
