import fs from 'fs';
import path from 'path';
import { build as viteBuild } from 'vite';
import { transformFile } from '@swc/core';
import fastGlob from 'fast-glob';
import {
  colours,
  globs,
  root,
  src2dist,
} from './config.mjs';

if (process.argv[1].includes('scripts/build.mjs')) {
  const inputs = fastGlob.sync(globs.map(p => path.join(root, p)));
  await build(inputs);
  await viteBuild({ configFile: 'src/renderer/vite.config.js' });
}

/**
 * @param {string[]} files 
 */
export async function build(files) {
  for (const file of files) {
    const distname = src2dist(file, true);
    const distpath = path.dirname(distname);
    const isTS = file.endsWith('.ts');

    const result = await transformFile(file, {
      jsc: {
        parser: {
          syntax: isTS ? 'typescript' : 'ecmascript',
        },
        target: 'es2019',
      },
      module: {
        type: 'commonjs',
      },
    });

    if (!fs.existsSync(distpath)) {
      fs.mkdirSync(distpath, { recursive: true });
    }
    fs.writeFileSync(distname, result.code);
    console.log(colours.cyan, `[${new Date().toLocaleTimeString()}]`, distname);
  }
}

