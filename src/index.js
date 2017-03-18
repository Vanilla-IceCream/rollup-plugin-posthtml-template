import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';

export default function(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    transform(code, id) {
      if (!filter(id)) return;

      const posthtmlopts = {
        sync: options.sync || false,
        parser: options.parser,
        render: options.render
      };

      return posthtml(options.plugins || [])
        .process(code, posthtmlopts)
        .then((result) => ({
          code: `export default ${JSON.stringify(result.html)};`,
          map: JSON.parse(result.map)
        }));
    }
  };
}