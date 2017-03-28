import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';

export default function(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'posthtml',
    transform(code, id) {
      if (!filter(id)) return;

      return posthtml(options.plugins || [])
        .process(code, {
          parser: options.parser,
          template: options.template || false
        })
        .then(result => {
          let code, map;

          code = `export default ${JSON.stringify(result.html)};`;
          map = result.map;

          return { code, map };
        });
    }
  };
}
