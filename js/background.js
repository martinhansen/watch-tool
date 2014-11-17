var environment = "NA";
var build = "NA";
var server = "NA";

function onRequest(request, sender, sendResponse) {

	chrome.pageAction.show(sender.tab.id);

	// Return nothing to let the connection be cleaned up.
	sendResponse({});
};

function onMessage(request, sender, sendResponse) {

	if (request.requestInfo == "isProd"){
		sendResponse({isProd: isProd})
	}

	if (request.isProd != null){
		var isProd = request.isProd;
	}

	if (request.requestInfo == "server"){
		sendResponse({server: server})
	}

	if (request.storeServer != null){
		server=request.storeServer;
    }

    if (request.requestInfo == "environment"){
		sendResponse({environment: environment})
	}

	if (request.storeEnv != null){
		environment=request.storeEnv;
	}

	if (request.requestInfo == "build"){
		sendResponse({build: build})
	}

	if (request.storeBuild != null){
		build=request.storeBuild;
	}

	//Handling for buttons in the popup.html
	if (request.type != null) {
		var openUrl = createUrl(request.type);
		if (openUrl != "") {
			chrome.tabs.create({url: openUrl});
		} else {
			alert("Could not open link");
		}
		alert(createUrl(request.type));
//		chrome.tabs.create({url: createUrl(request.type)});
	}
};

function createUrl(type) {
	var url = "http://"+ server + "." + environment + ".jppol.net";
	switch (type) {
		case "contentstudio":
			return url + "/studio/";
		case "webstudio":
			return url + "/escenic/";
		case "admin":
			return url + "/escenic-admin/";
		default:
			return "";
	}
}

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
chrome.extension.onMessage.addListener(onMessage);
