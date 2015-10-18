'use strict';
var http = require('http'),
	qs = require('querystring'),
	Logger = require('./modules/logger.js'),
	ExpressionEvaluator = require('./modules/expression-evaluator.js'),
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
					'message': parsedExpression.msg,
					'timestamp': timestamp,
					'eventType': 'GET'
				};

			logger.logSuccess(logFileName, logInfo);

			res.writeHead(200, {
			  'Content-Length': responseBody.length,
			  'Content-Type': 'text/plain'
			});

			res.write(responseBody, function(){
				var logInfo = {
					'message': answer,
					'timestamp': Date.now(),
				};
				logger.logResponseSent(logFileName, logInfo);
			});
			res.end();
		});
	}
});

server.listen(3000);
console.log('Server is listening on Port 3000');