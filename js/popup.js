
var PopupController = function () {
	this.button_ = document.getElementById('contentstudio');
	this.addListeners_()

	chrome.runtime.sendMessage({requestInfo: "server"}, function(response) {
		var server = response.server;
		document.getElementById('server').innerHTML = response.server;
	});

	chrome.runtime.sendMessage({requestInfo: "build"}, function(response) {
		document.getElementById('build').innerHTML = response.build;
	});
};

PopupController.prototype = {

	button_: null,

	addListeners_: function () {
		this.button_.addEventListener('click', this.handleClick_.bind(this));
	},

	handleClick_: function () {
		chrome.runtime.sendMessage({type: "admin"}, function(response){
		});
	}
};

document.addEventListener('DOMContentLoaded', function () {
  window.PC = new PopupController();
});

