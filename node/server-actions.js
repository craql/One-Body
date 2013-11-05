// NODE SERVER FUNCTIONS
var os = require("os");
var qs = require('querystring');
var request = require("request");
var url  = require('url');

exports.GETaction = function(request, response, callback){
	var queryData = "";
	var cdhurl = 'http://cdh.esri.com/?action=getGlobalData';
		
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

	console.log(query); //{Object}
	// request.on('data', function(data) {
		// queryData += data;
		// if(queryData.length > 1e6) {
			// queryData = "";
			// response.writeHead(413, {'Content-Type': 'text/plain'}).end();
			// request.connection.destroy();
		// }
	// });

	// request.on('end', function() {
		// response.get = querystring.parse(queryData);
		// callback();
	// });
	//request(cdhurl,function(e,r,b){
		//response.writeHead(200);
		//response.write(b);
		//response.end(b);
	//});
	http.get(cdhurl, function(res) {
		console.log("Got response: " + res.statusCode);
		 
		res.on("data", function(chunk){
		//console.log('chunk data');
			client_response += chunk;
			//response.writeHead(200);
			//response.write(client_response||'nothing');
			//response.end();
			//console.log(client_response);
		});
		
	}).on('error', function(e) {
		 console.log("Got error: " + e.message);
	});
	 response.writeHead(200);
	 
			response.writeHead(200, {'Content-Type': 'application/json'}).end();
	 response.write(client_response);
	 response.end();	
}

exports.clientRequest = function(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
				
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            response.post = querystring.parse(queryData);
            callback();
        });

    } 
	else if(request.method == 'GET') {
		exports.GETaction(request, response, callback);
    }
	else {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
    }
}