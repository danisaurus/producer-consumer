'use strict';
var http = require('http'),
	qs = require('querystring'),
	Logger = require('./bin/logger.js'),
	ExpressionEvaluator = require('./bin/expression-evaluator.js'),
	logger = new Logger(),
	expressionEvaluator = new ExpressionEvaluator(),
	logFileName = 'logs/consumer-log-' + Date.now() + '.txt';

var server = http.createServer( function(req, res){
	if (req.method === 'GET') {
		var expression = '',
			timestamp;

		req.on('data', function(data){
			expression += data;
			timestamp = Date.now();
		});
		req.on('end', function(){
			var parsedExpression = qs.parse(expression),
				answer = expressionEvaluator.evaluate(parsedExpression.msg),
				responseBody = qs.stringify({
					'msg': answer
				}),
				logInfo = {
					'message': 'A GET Request Was Receieved',
					'body': parsedExpression.msg,
					'timestamp': timestamp,
				};

			logger.logSuccess(logFileName, logInfo);

			res.writeHead(200, {
			  'Content-Length': responseBody.length,
			  'Content-Type': 'text/plain'
			});

			res.write(responseBody, function(){
				var logInfo = {
					'message': 'A response was sent',
					'body': answer,
					'timestamp': Date.now()
				};
				logger.logSuccess(logFileName, logInfo);
			});
			res.end();
		});
	}
});

server.listen(3000);
console.log('Server is listening on Port 3000');