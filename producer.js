var http = require('http');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');


var postData = qs.stringify({
  'msg' : '4+4'
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
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
  res.on('end', function() {
    console.log('No more data in response.')
  })
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData, function(){
	console.log(postData);
	var post = qs.parse(postData);
	var timestamp = Date.now();
	var log = 'The Expression ' + post.msg + ' was sent at ' + timestamp + ' || \n';

	fs.appendFile('logs/producer-log.txt', log, function (err) {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});

});

req.end();


var server = http.createServer( function(request, response){
	if (request.method === 'POST') {
		var body = '';
		request.on('data', function(data){
			body += data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			var requestMethod = request.method;
			var expression = post.msg;
			var timestamp = Date.now();
			var log = 'The answer ' + post.msg + ' was received via a ' + request.method + ' request at ' + timestamp + ' || \n';

			fs.appendFile('logs/producer-log.txt', log, function (err) {
			  if (err) throw err;
			  console.log('The "data to append" was appended to file!');
			});
		});
	}
});

server.listen(8000);
console.log('Server is listening on Port 3000');
// var expression =  qs.stringify({
//   'msg' : '4+4'
// });


// var requestOptions = {
// 	hostname: 'localhost',
// 	port: 3000,
// 	method: 'POST',
// 	headers: {
// 	    'Content-Type': 'application/x-www-form-urlencoded',
// 	    'Content-Length': expression.length,
// 	    'Connection': 'keep-alive'
// 	}
// };


// var request = http.request(requestOptions, function(res){
// 	console.log('STATUS: ' + res.statusCode);
// 	console.log('HEADERS: ' + JSON.stringify(res.headers));
// 	res.setEncoding('utf8');
// 	res.on('data', function (chunk) {
// 		console.log('BODY: ' + chunk);
// 	});
// 	res.on('end', function() {
// 		console.log('No more data in response.');
// 	})
// });

// request.on('error', function(e) {
// 	console.log('problem with request: ' + e.message);
// });


// request.write(expression);
// request.end();

