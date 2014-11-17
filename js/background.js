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

	if (request.requestInfo == "server"){
		sendResponse({server: server})
	}

	if (request.requestInfo == "build"){
		sendResponse({build: build})
	}

	if (request.storeServer != null){
		server=request.storeServer;
	}

	if (request.storeBuild != null){
		build=request.storeBuild;
	}

	if (request.isProd != null){
		var isProd = request.isProd;
	}
	//Handlers for buttons in the popup.html
	if (request.type == "admin"){
		chrome.tabs.create({url:"http://google.dk"});
	}
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
chrome.extension.onMessage.addListener(onMessage);
