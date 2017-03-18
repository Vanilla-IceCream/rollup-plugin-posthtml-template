# rollup-plugin-posthtml

Seamless integration between Rollup and PostHTML.

## Install

```bash
$
```

## Usage

```js
// rollup.config.js
import posthtml from 'rollup-plugin-posthtml';
import include from 'posthtml-include';

export default {
  entry: './src/app.js',
  dest: './dist/app.js',
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
// app.js
import hello from './hello.html';

document.querySelector('#ex').innerHTML = hello;
/*
  Output:
    <p>Hello</p>
    <p>World</p>
*/
```

## Options

`sync`

`parser`

`render`