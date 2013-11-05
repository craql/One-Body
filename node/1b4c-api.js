// NODE SERVER FUNCTIONS
var os = require("os");
var qs = require('querystring');
var request = require("request");
var url  = require('url');
var io = require('socket.io');


	function api_item(type){
		this.type = type;
		return this;
	}
	exports.church = function(){
		return api_item('church');
	}
	
	exports.ministry = function(){
		return api_item('ministry');
	}
	
	exports.api_item = api_item;
	
