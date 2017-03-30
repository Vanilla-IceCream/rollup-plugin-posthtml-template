import { join } from 'path';
import buble from 'rollup-plugin-buble';

const pkg = require('./package.json');

export default {
  entry: join(__dirname, 'src/index.js'),
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ],
  plugins: [buble()],
  external: Object.keys(pkg.dependencies),
  sourceMap: true
};
