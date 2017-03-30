(function () {
'use strict';

var foo = (_) => `<p>Foo</p>
<p>Bar</p>

<p>${ _.luv }</p>
`;

document.querySelector('#example').innerHTML = foo({ luv: 'Love' });

}());
