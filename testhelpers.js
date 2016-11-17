const fs = require('fs');
const path = require('path');
const helpers = {};
const plop = {
	setDefaultInclude: function () {},
	addHelper: function (name, func) {
		helpers[name] = func;
	}
};

require('./index')(plop);

var output = '';
Object.keys(helpers).forEach(function (name) {
	const func = helpers[name];
	output += (`\n// ${name}\n`);
	output += func('simple test text 1');
	output += '\n\n';
	output += func('simple test text 1\nthis also has a longer line');
	output += '\n\n';
});

fs.writeFileSync(path.resolve('./helper-output.js'), output, {encoding: 'utf8'});
