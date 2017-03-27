import { rollup } from 'rollup';
import { expect } from 'chai';

import posthtml from '../';

import sugarml from 'posthtml-sugarml';
import include from 'posthtml-include';

describe('rollup-plugin-posthtml', () => {
  it('should import html from file as string', () => {
    return rollup({
        entry: 'sample/basic.js',
        plugins: [posthtml()]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });

  it('should output empty sourcemap', () => {
    return rollup({
        entry: 'sample/basic.js',
        plugins: [posthtml()]
      })
      .then(result => {
        const { code, map } = result.generate({ sourceMap: true });
        expect(code).to.be.ok;
        expect(map).to.be.ok;
    });
  });

  it('should be able to use parser', () => {
    return rollup({
        entry: 'sample/parser.js',
        plugins: [
          posthtml({
            parser: sugarml()
          })
        ]
      })
      .then(result => {
        const { code, map } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });

  it('should be able to use plugins', () => {
    return rollup({
        entry: 'sample/plugins.js',
        plugins: [
          posthtml({
            plugins: [include()]
          })
        ]
      })
      .then(result => {
        const { code, map } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });

  it('should be able to use template', () => {
    return rollup({
        entry: 'sample/template.js',
        plugins: [
          posthtml({
            template: true
          })
        ]
      })
      .then(result => {
        const { code, map } = result.generate({ format: 'iife' });
        expect(code).to.be.ok;
    });
  });
});
