/* taste the rainbow */
(function () {
	var sheet;
	function addCSS(rule) {
		if (!sheet) {
			var style = document.createElement('style');
			document.head.appendChild(style);
			sheet = style.sheet;
		}
		sheet.insertRule(rule, sheet.cssRules.length);
	}

	window.addEventListener('DOMContentLoaded', function () {
		// don't cycle the colours for "dark" theme
		if (/\bdark\b/.test(document.body.className)) {
			return;
		}

		var steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var offset = Math.floor(Math.random() * 100);
		// to re-generate the wheels, add <script src="https://unpkg.com/culori"></script>
		//
		// function oklchWheel(l, c) {
		// 	return steps.map((step) => culori.formatHex({mode: 'oklch', l, c, h: step * 36}));
		// }
		// var palette = {
		// 	dim: oklchWheel(0.3, 0.05),
		// 	default: oklchWheel(0.4, 0.1),
		// 	bright: oklchWheel(0.8, 0.1),
		// }
		var palette = {
			dim: ["#42232d","#43241c","#3d290e","#30300f","#1d341d","#07362f","#05343e","#1a2f46","#2d2a45","#3a253c"],
			default: ["#712d45","#74301e","#683c00","#4e4b00","#1f5521","#00584a","#00536a","#17497b","#463d7a","#613266"],
			bright: ["#f3a3bb","#f7a791","#e6b374","#c4c375","#96cf95","#6dd3c0","#69cee7","#8ec2fd","#bab4fb","#dea8e2"]
		};

		var rules = {
			"a:visited": { color: palette.dim },
			"a, a:hover": { color: palette.default },
			"nav": { color: palette.bright, 'background-color': palette.default },
			"nav a, nav a:hover": { color: palette.bright },
		};

		Object.entries(rules).forEach(([selector, config], i) => {
			var name = 'generated_keyframes_' + i;
			addCSS(`
			@keyframes ${name} {
				${steps.map((x) => `
				${x === 0 ? '0%, 10' : x}0% {
					${config.color ? `color: ${config.color[x]};` : ''}
					${config['background-color'] ? `background-color: ${config['background-color'][x]};` : ''}
				}`).join('')}
			}`);
			addCSS(`
			${selector} {
				animation: 100s linear -${offset}s infinite ${name}; 
			}`);
		});
	});
})();
