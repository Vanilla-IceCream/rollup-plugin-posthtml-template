# rollup-plugin-posthtml-template [![Build Status](https://travis-ci.org/Vanilla-IceCream/rollup-plugin-posthtml-template.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/rollup-plugin-posthtml-template) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/rollup-plugin-posthtml-template/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/rollup-plugin-posthtml-template?branch=master)

Seamless integration between Rollup and PostHTML.

## Install

```bash
$ npm i rollup-plugin-posthtml-template -D
# or
$ yarn add rollup-plugin-posthtml-template -D
```

## Usage

```js
// rollup.config.js
import { join } from 'path';
import posthtml from 'rollup-plugin-posthtml-template';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    posthtml()
  ]
};
```

```html
<!-- hello.html -->
<p>Hello</p>
<p>World</p>
```

```js
// main.js
import hello from './hello.html';

document.querySelector('#ex').innerHTML = hello;
/*
  Output:
    <p>Hello</p>
    <p>World</p>
*/
```

### plugins

```js
// rollup.config.js
import { join } from 'path';
import posthtml from 'rollup-plugin-posthtml-template';
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
```

```html
<!-- world.html -->
<p>World</p>
```

```html
<!-- hello.html -->
<p>Hello</p>
<include src="world.html"></include>
```

```js
// main.js
import hello from './hello.html';

document.querySelector('#ex').innerHTML = hello;
/*
  Output:
    <p>Hello</p>
    <p>World</p>
*/
```

### template

```js
// rollup.config.js
import { join } from 'path';
import posthtml from 'rollup-plugin-posthtml-template';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    posthtml({
      template: true
    })
  ]
};
```

```html
<!-- hello.html -->
<p>Hello</p>
<p>${ _.text }</p>
```

```js
// main.js
import hello from './hello.html';

document.querySelector('#ex').innerHTML = hello({ text: 'World' });
/*
  Output:
    <p>Hello</p>
    <p>World</p>
*/
```

### parser

```js
// rollup.config.js
import { join } from 'path';
import posthtml from 'rollup-plugin-posthtml-template';
import sugarml from 'posthtml-sugarml';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    posthtml({
      parser: sugarml()
    })
  ]
};
```

```sgr
// hello.sgr
p Hello
p
  | World
```

```js
// main.js
import hello from './hello.sgr';

document.querySelector('#ex').innerHTML = hello;
/*
  Output:
    <p>Hello</p>
    <p>World</p>
*/
```

### directives

```js
// rollup.config.js
import { join } from 'path';
import posthtml from 'rollup-plugin-posthtml-template';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    posthtml({
      directives: [{ name: '%', start: '<', end: '>' }]
    })
  ]
};
```

```html
<!-- hello.html -->
<p>Hello</p>
<p><%= text %></p>
```

```js
// main.js
import { template } from 'lodash';

import hello from './hello.html';

document.querySelector('#ex').innerHTML = template(hello)({ text: 'World' });
/*
  Output:
    <p>Hello</p>
    <p>World</p>
*/
```
