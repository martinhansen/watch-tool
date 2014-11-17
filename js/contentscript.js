
var doc = document.getElementsByTagName('html')[0].innerHTML;
var serverRegex = /<!-- watch-(.*)@(.*?\d+).*?(jp-.*?)\s/;
var isWatchSite = serverRegex.test(doc);

var url = document.URL;
var frontpageRegex = /\.dk\/?$/;
var isFrontpage = frontpageRegex.test(url);

var prodRegex = /prod/;


if (isWatchSite) {

	var match = serverRegex.exec(doc);
	var isProd = prodRegex.test(match[3]);

	chrome.extension.sendRequest({}, function(response) {});
	chrome.runtime.sendMessage({storeEnv: match[3]}, function(response) {});
	chrome.runtime.sendMessage({storeServer: match[2]}, function(response) {});
	chrome.runtime.sendMessage({storeBuild: match[1]}, function(response) {});
	chrome.runtime.sendMessage({isProd: isProd}, function(response) {});

	if (isFrontpage){

		var overlay = document.createElement('div');
		overlay.classList.add('watchInfoOverlay');

		overlay.setAttribute('role', 'alert');
		overlay.innerHTML = "<h1>WatchInfo</h1>" +
							"<h2>Environment: " + match[3] +" </h2>" +
							"<h2>Server: " + match[2] +" </h2>" + 
							"<h2>Build: " + match[1] + " </h2>";
						
											
		document.body.appendChild(overlay);

		setTimeout(function() {
			   overlay.classList.add('visible');
		}, 100);

		setTimeout(function() {
				overlay.classList.remove('visible');
		}, 4000);
	}
} else {
// Not watchsite
}
