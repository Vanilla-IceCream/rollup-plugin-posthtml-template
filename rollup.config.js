import buble from 'rollup-plugin-buble';

import pkg from './package.json';

export default {
  entry: './src/index.js',
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ],
  plugins: [buble()],
  external: Object.keys(pkg.dependencies),
  sourceMap: true
};
