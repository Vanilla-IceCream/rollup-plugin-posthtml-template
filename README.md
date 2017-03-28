# rollup-plugin-posthtml

Seamless integration between Rollup and PostHTML.

## Install

```bash
$ npm i rollup-plugin-posthtml -D
```

## Usage

```js
// rollup.config.js
import { join } from 'path';
import posthtml from 'rollup-plugin-posthtml';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  moduleName: 'posthtml',
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
import posthtml from 'rollup-plugin-posthtml';
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

### parser

```js
// rollup.config.js
import { join } from 'path';
import posthtml from 'rollup-plugin-posthtml';
import sugarml from 'posthtml-sugarml';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  moduleName: 'posthtml',
  plugins: [
    posthtml({
      parser: sugarml()
    })
  ]
};
```

```sml
// hello.sml
p Hello
p
  | World
```

```js
// main.js
import hello from './hello.sml';

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
import posthtml from 'rollup-plugin-posthtml';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  moduleName: 'posthtml',
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
<p>${text}</p>
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
