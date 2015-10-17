var http = require('http');
var connect = require('connect');

var expression = '4+4';

var requestOptions = {
	hostname: 'localhost',
	port: 3000,
	path: '/',
	method: 'POST',
	headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': expression.length
	}
}


var request = http.request(requestOptions, function(res){
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	});
	res.on('end', function() {
		console.log('No more data in response.');
	})
});

req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
});


request.write(expression);
request.end();