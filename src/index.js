import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';
// import { template } from 'lodash';

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
          // const _template = template(code, templateOptions);
          return {
            code: options.template ? `export default (_) => \`${result.html}\`` : `export default ${JSON.stringify(result.html)}`,
            map: { mappings: '' }
          };
        });
    }
  };
}
