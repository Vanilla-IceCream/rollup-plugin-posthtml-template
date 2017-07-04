import { join } from 'path';
import { rollup } from 'rollup';

import posthtml from '../';

import sugarml from 'posthtml-sugarml';
import include from 'posthtml-include';

process.chdir(__dirname);

const bundler = (entry, options) => rollup({ entry, plugins: [posthtml(options)] });

describe('rollup-plugin-posthtml', () => {
  it('should import html from file as string', () => {
    return bundler('fixtures/basic/main.js')
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).toBeDefined();
        expect(code).toMatch(/<p>Foo<\/p>/);
    });
  });

  it('should output empty sourcemap', () => {
    return bundler('fixtures/basic/main.js')
      .then(result => {
        const { map } = result.generate({ format: 'es', sourceMap: true });
        expect(map).toBeDefined();
        expect(map.file).toBe(null);
    });
  });

  it('should be able to use the plugins option', () => {
    return bundler('fixtures/plugins/main.js', { plugins: [include()] })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).toBeDefined();
        expect(code).toMatch(/<p>Foo<\/p>/);
        // expect(code).toMatch(/<p>Bar<\/p>/);
    });
  });

  it('should be able to use the template option', () => {
    return bundler('fixtures/template/main.js', { template: true })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).toBeDefined();
        expect(code).toMatch(/<p>\${ _.text }<\/p>/);
    });
  });

  it('should be able to use the parser option', () => {
    return bundler('fixtures/parser/main.js', { parser: sugarml() })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'posthtml' });
        expect(code).toBeDefined();
        expect(code).toMatch(/<p>Foo<\/p>/);
    });
  });
});
