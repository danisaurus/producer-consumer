var http = require('http');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');
var Logger = require('modules/logger.js')

var logger = new Logger();

function answerExpression(expression){
	return eval(expression);
}

var consumerServer = http.createServer( function(request, response){
	if (request.method === 'POST') {
		var expression = '';
		var timestamp;
		request.on('data', function(data){
			expression += data;
			timestamp = Date.now();

		});
		// var body = '';
		request.on('end', function(){
			var parsedExpression = qs.parse(expression);
			console.log(parsedExpression);
			var answer = answerExpression(parsedExpression.msg);
			console.log(answer);
			var responseBody = qs.stringify({
				'msg': answer
			});
			var requestEvent = {
				'message': parsedExpression.msg,
				'timestamp': timestamp,
				'eventType': 'POST'
			}
			logger.logRequestReceived('logs/consumer-log.txt', requestEvent);

			response.writeHead(200, {
			  'Content-Length': responseBody.length,
			  'Content-Type': 'text/plain'
			});

			response.write(responseBody, function(){
				var responseEvent = {
					'message': answer,
					'timestamp': Date.now(),
				}
				logger.logResponseSent('logs/consumer-log.txt', responseEvent);
			});
		});
	}
});

consumerServer.listen(3000);
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

