import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';

var index = function(options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{html,sgr}'; }

  var filter = createFilter(options.include, options.exclude);

  return {
    name: 'posthtml',
    transform: function transform(code, id) {
      if (!filter(id)) { return; }

      return posthtml(options.plugins || [])
        .process(code, { parser: options.parser })
        .then(function (result) {
          return {
            code: options.template ? ("export default (_) => `" + (result.html) + "`") : ("export default " + (JSON.stringify(result.html))),
            map: { mappings: '' }
          };
        });
    }
  };
};

export default index;
//# sourceMappingURL=rollup-plugin-posthtml-template.es.js.map
