/*----------------------------------
MONGODB Handler for 1b4c
-----------------------------------*/
var $ = require("jqNode").$;
var mongojs = require('mongojs');
var db = mongojs('local');
var collections = ['Churches','Campuses','Ministries','Users'];

//var db = mongojs(connectionString, [collections]);
exports.db = db;

collections.map(function(c){
	exports[c] = db.collection(c);
	testCollection(c);
})


/*var mc = db.collection('socket_test');
mc.save({test:'yes test'},function(e){console.log('record added')});
mc.find(function(err, docs) {
	console.log('\socket_test: '+docs.length)
	console.log(docs);
    // docs is an array of all the documents in mycollection
});*/

function testCollection(c){
	var coll = exports[c];
	var defs = {
		author:'corey'
	}
	coll.save($.extend({name:c+' test'},defs),function(e){
		console.log('\n'+c+' added')
		coll.find(function(err, docs) {
			// docs is an array of all the documents in mycollection
			console.log('	records: '+docs.length);
			console.log('\n	'+JSON.stringify(docs));
			coll.remove();
			
		});
	
	});

}