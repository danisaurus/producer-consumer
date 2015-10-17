var http = require('http');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');
var ExpressionGenerator = require('modules/expression-generator.js');
var Logger = require('modules/logger.js')

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
	res.setEncoding('utf8');
	var answer = '';
	var timestamp;
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

request.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
request.write(postData, function(){
	var parsedPostData = qs.parse(postData);
	var requestEvent = {
		'message': parsedPostData.msg,
		'timestamp': Date.now(),
		'eventType': 'POST'
	}
	logger.logRequestSent('logs/producer-log', requestEvent)
});
// req.write(postData, function(){
// 	console.log(postData);
// 	var post = qs.parse(postData);
// 	var timestamp = Date.now();
// 	var log = 'The Expression ' + post.msg + ' was sent at ' + timestamp + ' || \n';

// 	fs.appendFile('logs/producer-log.txt', log, function (err) {
// 	  if (err) throw err;
// 	  console.log('The "data to append" was appended to file!');
// 	});

// });

request.end();
