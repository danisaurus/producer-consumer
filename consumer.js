var http = require('http');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');
var Logger = require('./modules/logger.js');

var logger = new Logger();

function answerExpression(expression){
	return eval(expression);
};

var server = http.createServer( function(req, res){
	if (req.method === 'POST') {
		var expression = '';
		var timestamp;
		req.on('data', function(data){
			expression += data;
			timestamp = Date.now();

		});
		// var body = '';
		req.on('end', function(){
			var parsedExpression = qs.parse(expression);
			var answer = answerExpression(parsedExpression.msg);
			var responseBody = qs.stringify({
				'msg': answer
			});
			var requestEvent = {
				'message': parsedExpression.msg,
				'timestamp': timestamp,
				'eventType': 'POST'
			}
			logger.logRequestReceived('logs/consumer-log.txt', requestEvent);

			res.writeHead(200, {
			  'Content-Length': responseBody.length,
			  'Content-Type': 'text/plain'
			});

			res.write(responseBody, function(){
				var responseEvent = {
					'message': answer,
					'timestamp': Date.now(),
				}
				logger.logResponseSent('logs/consumer-log.txt', responseEvent);
			});
		});
	}
});

server.listen(3000);
console.log('Server is listening on Port 3000');




// var app = connect();



// app.use('/', function (request, response, next) {
// 	console.log('REQ:', request);
// 	if (request.method === 'POST') {
// 		
// 		console.log('I am working');

// 	}
// 	request.on('end', function () {
//         var post = qs.parse(body);
//         console.log('This is the Post', post);
//     });
// 	next();
// });



// var server = http.createServer(
// );

// server.on("listening", function() {
// 	console.log('hello, i am listening');
// });

// server.listen('localhost', 8000);

