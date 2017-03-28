'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var posthtml = _interopDefault(require('posthtml'));

var index = function(options) {
  if ( options === void 0 ) options = {};

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

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

module.exports = index;
//# sourceMappingURL=rollup-plugin-posthtml.cjs.js.map