'use strict';
var http = require('http'),
	qs = require('querystring'),
	ExpressionGenerator = require('./bin/expression-generator.js'),
	Logger = require('./bin/logger.js'),
	expressionGenerator = new ExpressionGenerator(),
	logger = new Logger(),
	logFileName = 'logs/producer-log-' + Date.now() + '.txt';

function sendExpression(){
	var postData = qs.stringify({
			'msg' : expressionGenerator.arithmeticExpression()
		});
	var options = {
			hostname: 'localhost',
			port: 3000,
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': postData.length
			}
		};
	var req = http.request(options, function(res) {
			var answer = '',
				timestamp;
			res.setEncoding('utf8');
			res.on('data', function (data) {
				answer += data;
				timestamp = Date.now();
			});
			res.on('error', function(e){
				var logInfo = {
					'message': 'There was a problem with the response:' + e.message
				};
				logger.logError(logFileName, logInfo);
			});
			res.on('end', function() {
				var parsedAnswer = qs.parse(answer),
					logInfo = {
						'message': 'A response was received',
						'body': parsedAnswer.msg,
						'timestamp': timestamp
					};
				logger.logSuccess(logFileName, logInfo);
			});
		});

	req.on('error', function(e) {
		var logInfo = {
			'message': 'problem with request:' + e.message,
			'timestamp': Date.now()
			};
		logger.logError(logFileName, logInfo);
	});

	req.write(postData, function(){
		var parsedPostData = qs.parse(postData),
			timestamp = Date.now(),
			logInfo = {
				'message': 'A GET request was sent', 
				'body': parsedPostData.msg,
				'timestamp': timestamp
			};
		logger.logSuccess(logFileName, logInfo);
	});

	req.end();
}

var interval = setInterval(sendExpression, 50);
setTimeout(function(){
	clearInterval(interval);
}, 10000);


