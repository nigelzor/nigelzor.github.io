/* taste the rainbow */
(function () {
	var oldonload = window.onload;

	window.onload = function () {
		if (oldonload) oldonload();

		var fg = function (sat, val) { return { layer: "fg", sat: sat, val: val }; };
		var bg = function (sat, val) { return { layer: "bg", sat: sat, val: val }; };

		// TODO: don't require these to be in the CSS -- add them dynamically
		var stylemapping = {
			"a:visited": fg(0.5, 0.3),
			// duplication because IE splits the selector
			"a": fg(0.7, 0.55), "a:hover": fg(0.7, 0.55),
			"h1": bg(0.7, 0.5),
			"#subhead": fg(0.5, 0.75),
			"#subhead a": fg(0.5, 0.85)
		};

		// [css-rule, mapping]
		var crules = [];
		var ruleset = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
		for (var i = 0; i < ruleset.length; i++) {
			var st = ruleset[i];
			if (st.selectorText) {
				var mapping = stylemapping[st.selectorText.toLowerCase()];
				if (mapping !== undefined) {
					crules.push([st, mapping]);
				}
			}
		}

		var hue = Math.random() * 360;
		var colorTick = function () {
			for (var i = 0; i < crules.length; i++) {
				var mapping = crules[i][1];
				var color = hexString(HSVtoRGB(hue, mapping.sat, mapping.val));
				if (mapping.layer === "fg") {
					crules[i][0].style.color = color;
				} else if (mapping.layer === "bg") {
					crules[i][0].style.backgroundColor = color;
				}
			}
			hue = (hue + 1) % 360;
			window.setTimeout(colorTick, 300);
		};

		// don't cycle the colours for "dark" theme
		if (!(/\bdark\b/.test(document.body.className))) {
			colorTick();
		}
	};

	function hexString(red, green, blue) {
		if (arguments.length === 1) {
			green = arguments[0][2];
			blue = arguments[0][1];
			red = arguments[0][0];
		}

		function decToHex(dec) {
			var hexStr = "0123456789ABCDEF";
			var low = dec % 16;
			var high = (dec - low)/16;
			return "" + hexStr.charAt(high) + hexStr.charAt(low);
		}
		return "#" + decToHex(red) + decToHex(green) + decToHex(blue);
	}

	function HSVtoRGB(hue, sat, val) {
		if (arguments.length === 1) {
			val = arguments[0][2];
			sat = arguments[0][1];
			hue = arguments[0][0];
		}

		function floatTo255(r, g, b) {
			return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
		}

		if (sat === 0) {
			return floatTo255(val, val, val);
		}

		var h = hue / 60;
		var i = Math.floor(h);
		var f = h - i;
		var p = val * (1 - sat);
		var q = val * (1 - sat * f);
		var t = val * (1 - sat * (1 - f));

		switch (i) {
			case 0: return floatTo255(val, t, p);
			case 1: return floatTo255(q, val, p);
			case 2: return floatTo255(p, val, t);
			case 3: return floatTo255(p, q, val);
			case 4: return floatTo255(t, p, val);
			case 5: return floatTo255(val, p, q);
		}
	}
})();