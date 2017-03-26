var posthtml = (function () {
'use strict';

var main = "import foo from './foo.html';\r\n\r\ndocument.querySelector('#example').innerHTML = foo;\r\n";

return main;

}());
