# rollup-plugin-posthtml-template [![Build Status](https://travis-ci.org/Vanilla-IceCream/rollup-plugin-posthtml-template.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/rollup-plugin-posthtml-template) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/rollup-plugin-posthtml-template/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/rollup-plugin-posthtml-template?branch=master)

Seamless integration between Rollup and PostHTML.

## Install

```bash
$ npm i rollup-plugin-posthtml-template -D
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

TODO: Lodash template

```html
<!-- template.html -->
<p><%= text %></p>

<ul>
  <% [].forEach.call(list, item => { %>
    <li><%- item %></li>
  <% }); %>
</ul>

<!-- or -->

<p>${ text }</p>

<ul>
  <% for (let item of list) { %>
    <li><%- item %></li>
  <% } %>
</ul>
```

```js
// main.js
import template from './template.html';

document.querySelector('#ex').innerHTML = template({
  text: 'rollup-plugin-posthtml-template',
  list: ['foo', 'bar', 'baz']
});
/*
  Output:
    <p>rollup-plugin-posthtml-template</p>

    <ul>
      <li>foo</li>
      <li>bar</li>
      <li>baz</li>
    </ul>
*/
```

TODO: CSS modules

Related:
* [`rollup-plugin-postcss`](https://github.com/egoist/rollup-plugin-postcss)
* [`rollup-plugin-json`](https://github.com/rollup/rollup-plugin-json)

```html
<!-- template.html -->
<p class="${ style.text }">
  ${ text }
</p>
```

```scss
// style.css
.text {
  color: #F44336;
}
```

```js
// data.json
{
  "text": "rollup-plugin-posthtml-template"
}
```

```js
import template from './template.html';
import style from './style.css';
import data from './data.json';

document.querySelector('#ex').innerHTML = template(data, { style });  // template([data={}], [imports={}])
/*
  Output:
    <p class="_text_3zyde4l1yATCOkgn-DBWEL">
      rollup-plugin-posthtml-template
    </p>
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

Don't forget to install `atom-sugarml`. (If you are using the Atom editor)
