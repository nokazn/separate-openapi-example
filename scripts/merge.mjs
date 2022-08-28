#!/usr/bin/env node

import swaggerMerger from 'swagger-merger';
import path from 'node:path';
import fs from 'node:fs';
import url from 'node:url';

/**
 * @param  {...string} paths
 * @returns {string}
 */
const fromProjectRoot = (...paths) => {
  return path.join(url.fileURLToPath(import.meta.url), '../..', ...paths);
};

/**
 * @param {string} targetPath
 * @returns {string}
 */
const readDirRecursively = (targetPath) => {
  return fs
    .readdirSync(targetPath, {
      encoding: 'utf8',
      withFileTypes: true,
    })
    .flatMap((entry) => {
      const currentTargetPath = path.join(targetPath, entry.name);
      return entry.isDirectory() ? readDirRecursively(currentTargetPath) : currentTargetPath;
    });
};

const main = () => {
  swaggerMerger
    .merge({
      input: 'index.json',
      output: 'swagger.json',
      compact: false,
    })
    .catch((e) => {
      console.error(e);
    });
};

console.log(readDirRecursively(fromProjectRoot('paths')));
