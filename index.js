
module.exports = function (plop, config) {

	// setup config defaults
	const cfg = Object.assign({
		prefix: '',
		upperCaseHeaders: false,
		blockStart: '/*',
		blockEnd: '*/',
		inlineStart: '//'
	}, config || {});

	plop.setDefaultInclude({ helpers: true });

	plop.addHelper(`${cfg.prefix}multi-line-header`, multiLineHeader);

	plop.addHelper(`${cfg.prefix}header`, function(text) {
		return multiLineHeader(text.split('\n')[0]);
	});

	plop.addHelper(`${cfg.prefix}header-end`, function(text) {
		if (cfg.upperCaseHeaders) { text = text.toUpperCase(); }
		// one line only
		text = text.split('\n')[0];

		const border = '==';
		const padding = '  ';
		return `${cfg.inlineStart} ${border}${padding}END ${text}${padding}${border}`;
	});

	function multiLineHeader(text) {
		if (cfg.upperCaseHeaders) { text = text.toUpperCase(); }
		const border = '==';
		const padding = '  ';
		const lines = text.split('\n');
		const longestLine = Math.max.apply(null, lines.map(line => line.length));
		var out = `${cfg.blockStart} ${repeat('=', longestLine + (border.length * 2) + (padding.length * 2))}`;
		out += `\n${repeat(' ', cfg.blockStart.length)} ${border}${padding}`;
		out += lines.map(line => (line.length < longestLine ? line + repeat(' ', longestLine - line.length) : line))
			.join(`${padding}${border}\n${repeat(' ', cfg.blockStart.length)} ${border}${padding}`);
		out += `${padding}${border}\n`;
		out += `${repeat(' ', cfg.blockStart.length)} ${repeat('=', longestLine + (border.length * 2) + (padding.length * 2))} ${cfg.blockEnd}`;

		return out;
	}
};

function repeat(char, amt) {
	return (new Array(amt + 1)).join(char);
}
