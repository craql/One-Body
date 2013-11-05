/*-------------------------
	Required Includes
-------------------------*/	
var $ = require("jqNode").$;
var http = require('http');

var os = require("os");
var qs = require('querystring');
var request = require("request");

var url  = require('url');

var sa = require('./server-actions.js');

var fs = require('fs');
var appname ='1 Body 4 Christ';

var ioUser = require('./io_users.js');
/*-------------------------
	Global Vars
-------------------------*/	
var client_response = '';
var port = 1200;
port += 2;

/*----------------------------------
HTTP SERVER
-----------------------------------*/
http.createServer(function(request, response) {

   sa.clientRequest(request, response, function() {
        console.log((response.post||response.get));

        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end();
    });

}).listen(port);
console.log(appname+' Server Listening on port: '+port);

/*----------------------------------
SOCKETIO SERVER
-----------------------------------*/
var io = require('socket.io').listen(port+1);
io.set('log level', 1);
var users = [];
console.log(ioUser);
io.sockets.on('connection', function (socket) {
	console.log('\nauthenticating user');
	socket.emit('authenticating', { hello: 'world' });
	
	console.log(ioUser);
	if(ioUser.authenticateUser(socket)){
		ioUser.registerUser(socket);

	}
	
	
 	socket.on('disconnect', function () {
    	console.log('socket disconnected');
	});
});
console.log(appname+' Socket.io Listening on port: '+(port+1));
/*----------------------------------
MONGO HANDLER
-----------------------------------*/
//var mongojs = require('mongojs');
var MDB = require('./1b4c-mongo.js');
