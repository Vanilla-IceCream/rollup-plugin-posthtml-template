import { createFilter } from 'rollup-pluginutils';
import posthtml from 'posthtml';

var index = function(options) {
  if ( options === void 0 ) options = {};

  var filter = createFilter(options.include, options.exclude);

  return {
    name: 'posthtml',
    transform: function transform(code, id) {
      if (!filter(id)) { return; }

      return posthtml(options.plugins || [])
        .process(code, { parser: options.parser })
        .then(function (result) {
          var code, map;

          code = "export default " + (JSON.stringify(result.html)) + ";";
          map = result.map;

          return { code: code, map: map };
        });
    }
  };
};

export default index;
//# sourceMappingURL=rollup-plugin-posthtml.es.js.map
