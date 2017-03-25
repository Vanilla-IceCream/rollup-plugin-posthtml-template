import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';

export default function(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    transform(code, id) {
      if (!filter(id)) return;

      return posthtml(options.plugins || [])
        .process(code, { parser: options.parser })
        .then(result => ({
          code: `export default ${JSON.stringify(result.html)};`,
          map: JSON.parse(result.map)
        }));
    }
  };
}
