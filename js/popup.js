
var PopupController = function () {
	this.csButton_ = document.getElementById('contentstudio');
	this.wsButton_ = document.getElementById('webstudio');
	this.adminButton_ = document.getElementById('admin');
	this.addListeners_()

	//Requests info from the background.js
	chrome.runtime.sendMessage({requestInfo: "environment"}, function(response) {
		document.getElementById('environment').innerHTML = response.environment;
	});

	chrome.runtime.sendMessage({requestInfo: "server"}, function(response) {
		document.getElementById('server').innerHTML = response.server;
	});

	chrome.runtime.sendMessage({requestInfo: "build"}, function(response) {
		document.getElementById('build').innerHTML = response.build;
	});
};

PopupController.prototype = {

	csButton_: null,
	wsButton_: null,
	adminButton_: null,

	addListeners_: function () {
		this.csButton_.addEventListener('click', this.handleClick_.bind(this));
		this.wsButton_.addEventListener('click', this.handleClick_.bind(this));
		this.adminButton_.addEventListener('click', this.handleClick_.bind(this));
	},

	handleClick_: function (event) {
		chrome.runtime.sendMessage({type: event.target.id}, function(response){
		});
	}
};

document.addEventListener('DOMContentLoaded', function () {
  window.PC = new PopupController();
});

