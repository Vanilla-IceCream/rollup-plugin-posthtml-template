import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';
import { template } from 'lodash';

export default function(options = {}) {
  if (!options.include) options.include = '**/*.{html,sgr}';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'posthtml',
    transform(code, id) {
      if (!filter(id)) return;

      return posthtml(options.plugins || [])
        .process(code, { parser: options.parser })
        .then(result => {
          const compiled = (imports = {}) => template(result.html, { imports });

          return {
            code: options.template
              ? `export default (data, imports) => \`${compiled(imports)(data)}\``
              : `export default ${JSON.stringify(result.html)}`,
            map: { mappings: '' }
          };
        });
    }
  };
}
