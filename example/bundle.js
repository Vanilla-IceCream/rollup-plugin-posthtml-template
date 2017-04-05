(function () {
'use strict';

var foo = (_) => `<p>Foo</p>
<p>Bar</p>

<p>${ _.baz }</p>
`;

/**
 * @name html-example
 */

document.querySelector('#example').innerHTML = foo({ baz: 'Baz' });

/**
 * @name sgr-example
 */

// import foo from './foo.sgr';

// document.querySelector('#example').innerHTML = foo({ baz: 'Baz' });

}());
