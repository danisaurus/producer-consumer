var http = require('http');
// var connect = require('connect');

// var app = connect();

// app.listen(3000);

// var fs = require('fs');
// var path = require('path');
// var index = path.resolve(__dirname, './index.html');

http.createServer(function(req, res) {
	console.log("Hi, there is an outer world"); 
}).listen(8000);

http.createServer(function(req, res) {

	if (request.method == 'GET') {
		console.log("This is a request Method"); 
	}

}).listen(8000);


function answer(response) {
	response.writeHead(200, {
		'Content-Type': 'application/json',

		'Access-Control-Allow-Origin' : '*'
	});
}

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

console.log('Listening!');

console.log('not listening');

var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);