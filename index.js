
module.exports = function (plop, config) {

	// setup config defaults
	const cfg = Object.assign({
		prefix: 'js-',
		upperCaseHeaders: false,
		commentStart: '/*',
		commentEnd: '*/',
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
		return `${cfg.commentStart}${border}${padding}END ${text}${padding}${border}${cfg.commentEnd}`;
	});

	function multiLineHeader(text) {
		if (cfg.upperCaseHeaders) { text = text.toUpperCase(); }
		const border = '==';
		const padding = '  ';
		const lines = text.split('\n');
		const longestLine = Math.max.apply(null, lines.map(line => line.length));
		var out = `${cfg.commentStart}${repeat('=', longestLine + (border.length * 2) + (padding.length * 2) - cfg.commentStart.length)}`;
		out += `\n${border}${padding}`;
		out += lines.map(line => (line.length < longestLine ? line + repeat(' ', longestLine - line.length) : line))
			.join(`${padding}${border}\n${border}${padding}`);
		out += `${padding}${border}\n`;
		out += `${repeat('=', longestLine + (border.length * 2) + (padding.length * 2) - cfg.commentEnd.length)}${cfg.commentEnd}`;

		return out;
	}
};

function repeat(char, amt) {
	return (new Array(amt + 1)).join(char);
}
