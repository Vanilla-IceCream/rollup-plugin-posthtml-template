import { rollup } from 'rollup';
import { expect } from 'chai';

import posthtml from '../';

import sugarml from 'posthtml-sugarml';
import include from 'posthtml-include';

describe('rollup-plugin-posthtml', () => {
  it('should import html from file as string', () => {
    return rollup({
        entry: 'samples/basic/basic.js',
        plugins: [posthtml()]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });

  it('should be able to use the parser option', () => {
    return rollup({
        entry: 'samples/parser/parser.js',
        plugins: [
          posthtml({
            parser: sugarml()
          })
        ]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });

  it('should be able to use the plugins option', () => {
    return rollup({
        entry: 'samples/plugins/plugins.js',
        plugins: [
          posthtml({
            plugins: [include()]
          })
        ]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });

  it('should be able to use the template option', () => {
    return rollup({
        entry: 'samples/template/template.js',
        plugins: [
          posthtml({
            template: true
          })
        ]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });
});
