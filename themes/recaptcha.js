/* change mailhide links to open popup windows */
(function () {
	var oldonload = window.onload;

	window.onload = function () {
		if (oldonload) oldonload();

		function opener (href) {
			return function() {
				window.open(href, "", "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=300");
				return false;
			};
		}
		var links = document.getElementsByTagName("a");
		var prefix = "http://mailhide.recaptcha.net/d?";
		for (var i = 0; i < links.length; i++) {
			var href = links[i].getAttribute("href");
			if (href && href.indexOf(prefix) === 0) {
				links[i].onclick = opener(href);
			}
		}
	};
})();