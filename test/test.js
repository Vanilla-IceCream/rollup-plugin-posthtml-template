import { join } from 'path';
import { rollup } from 'rollup';
import { expect } from 'chai';

import posthtml from '../';

import sugarml from 'posthtml-sugarml';
import include from 'posthtml-include';

process.chdir('test');

describe('rollup-plugin-posthtml', () => {
  it('should import html from file as string', () => {
    return rollup({
        entry: join(__dirname, 'samples/basic/basic.js'),
        plugins: [posthtml()]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).to.be.ok;
    });
  });

  it('should output empty sourcemap', () => {
    return rollup({
        entry: join(__dirname, 'samples/basic/basic.js'),
        plugins: [posthtml()]
      })
      .then(result => {
        const { map } = result.generate({ format: 'es', sourceMap: true });
        expect(map).to.be.ok;
    });
  });

  it('should be able to use the plugins option', () => {
    return rollup({
        entry: join(__dirname, 'samples/plugins/plugins.js'),
        plugins: [
          posthtml({
            plugins: [include()]
          })
        ]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).to.be.ok;
    });
  });

  it('should be able to use the template option', () => {
    return rollup({
        entry: join(__dirname, 'samples/template/template.js'),
        plugins: [
          posthtml({
            template: true
          })
        ]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).to.be.ok;
    });
  });

  it('should be able to use the parser option', () => {
    return rollup({
        entry: join(__dirname, 'samples/parser/parser.js'),
        plugins: [
          posthtml({
            parser: sugarml()
          })
        ]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).to.be.ok;
    });
  });
});
