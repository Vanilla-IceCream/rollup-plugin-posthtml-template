import { join } from 'path';
import { rollup } from 'rollup';

import posthtml from '../';

import sugarml from 'posthtml-sugarml';
import include from 'posthtml-include';

process.chdir(__dirname);

const bundler = (input, options = {}) => rollup({ input, plugins: [posthtml(options)] });

describe('rollup-plugin-posthtml', () => {
  it('should import html from file as string', async () => {
    const { generate } = await bundler('fixtures/basic/main.js');
    const { code } = await generate({ format: 'iife', name: 'posthtml' });

    expect(code).toBeDefined();
    expect(code).toMatch(/<p>Foo<\/p>/);
  });

  it('should output empty sourcemap', async () => {
    const { generate } = await bundler('fixtures/basic/main.js');
    const { map } = await generate({ format: 'es', sourcemap: true });

    expect(map).toBeDefined();
    expect(map.file).toBeNull();
  });

  it('should be able to use the plugins option', async () => {
    const { generate } = await bundler('fixtures/plugins/main.js', { plugins: [include()] });
    const { code } = await generate({ format: 'iife', name: 'posthtml' });

    expect(code).toBeDefined();
    expect(code).toMatch(/<p>Foo<\/p>/);
    expect(code).toMatch(/<p>Bar<\/p>/);
  });

  it('should be able to use the template option', async () => {
    const { generate } = await bundler('fixtures/template/main.js', { template: true });
    const { code } = await generate({ format: 'iife', name: 'posthtml' });

    expect(code).toBeDefined();
    expect(code).toMatch(/<p>\${ _.text }<\/p>/);
  });

  it('should be able to use the parser option', async () => {
    const { generate } = await bundler('fixtures/parser/main.js', { parser: sugarml() });
    const { code } = await generate({ format: 'iife', name: 'posthtml' });

    expect(code).toBeDefined();
    expect(code).toMatch(/<p>Foo<\/p>/);
  });
});
