import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';

export default function(options = {}) {
  if (!options.include) options.include = '**/*.html';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'posthtml',
    transform(code, id) {
      if (!filter(id)) return;

      return posthtml(options.plugins || [])
        .process(code, { parser: options.parser })
        .then(result => {
          const html = options.template
            ? `export default (_) => ${result.html}`
            : `export default ${JSON.stringify(result.html)}`;

          return html;
        });
    }
  };
}
