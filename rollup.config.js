import buble from 'rollup-plugin-buble';

import { main, module, dependencies } from './package.json';

export default {
  entry: './src/index.js',
  targets: [
    { dest: main, format: 'cjs' },
    { dest: module, format: 'es' }
  ],
  plugins: [buble()],
  external: Object.keys(dependencies),
  sourceMap: true
};
