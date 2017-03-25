import { rollup } from 'rollup';
import { expect } from 'chai';

import posthtml from '../';

describe('rollup-plugin-posthtml', () => {
  it('should import html from file as string', () => {
    return rollup({
        entry: 'sample/basic.js',
        plugins: [posthtml()]
      })
      .then(result => {
        const { code } = result.generate({ format: 'iife' });
        expect(code).to.equal(`<p>World</p>`);
    });
  });
});
