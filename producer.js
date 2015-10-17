var http = require('http');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');
var ExpressionGenerator = require('./modules/expression-generator.js');
var Logger = require('./modules/logger.js');

var expressionGenerator = new ExpressionGenerator();
var logger = new Logger();
var expression = expressionGenerator.arithmeticExpression();


var postData = qs.stringify({
  'msg' : expression
});


var options = {
  hostname: 'localhost',
  port: 3000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request(options, function(res) {
	var answer = '';
	var timestamp;
	res.setEncoding('utf8');
	res.on('data', function (data) {
		answer += data
		timestamp = Date.now();
	});
	res.on('end', function() {
		var parsedAnswer = qs.parse(answer);
		var responseEvent = {
			'message': parsedAnswer.msg,
			'timestamp': timestamp
		}
		logger.logResponseReceived('logs/producer-log.txt', responseEvent);
	});
});

req.on('error', function(e) {
  var errorEvent = {
  	'message': 'problem with request:' + e.message,
  	'timestamp': Date.now()
  }
  logger.logError('logs/producer-log.txt', errorEvent)
});

// write data to request body
req.write(postData, function(){
	var parsedPostData = qs.parse(postData);
	var requestEvent = {
		'message': parsedPostData.msg,
		'timestamp': Date.now(),
		'eventType': 'POST'
	}
	logger.logRequestSent('logs/producer-log', requestEvent)
});


req.end();
