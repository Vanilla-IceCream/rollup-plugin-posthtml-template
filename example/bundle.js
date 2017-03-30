(function () {
'use strict';

var foo = (_) => `<p>Foo</p>
<p>Bar</p>

<p>${ _.luv }</p>
`;

/**
 * @name html-example
 */

document.querySelector('#example').innerHTML = foo({ luv: 'Love' });

/**
 * @name sml-example
 */

// import foo from './foo.sml';

// document.querySelector('#example').innerHTML = foo({ luv: 'Love' });

}());
