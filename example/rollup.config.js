import { join } from 'path';

const posthtml = require('../');

import include from 'posthtml-include';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    posthtml({
      plugins: [include()]
    })
  ]
};
