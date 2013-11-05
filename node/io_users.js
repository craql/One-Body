// NODE SERVER FUNCTIONS
var os = require("os");
var qs = require('querystring');
var request = require("request");
var url  = require('url');
var io = require('socket.io');
var api = require('./1b4c-api.js');


	exports.authenticateUser = function(socket){
		console.log('user authenticated');
		socket.authenticated = true;
		socket.emit('authenticated',{});
		return true;
	}
	
	exports.registerUser = function(socket){
		
		console.log('user registered');
		//sendAPI(socket);
	}
	sendAPI = function(socket){
		socket.emit('api',exports);
		console.log(exports);
	}

	exports.sendAPI = sendAPI;