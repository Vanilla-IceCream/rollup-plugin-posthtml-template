import { join } from 'path';
const posthtml = require('../');
import include from 'posthtml-include';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  moduleName: 'posthtml',
  plugins: [
    posthtml({
      plugins: [include()]
    })
  ]
};
