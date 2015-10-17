var http = require('http');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');


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
			var log = 'The Expression ' + post.msg + ' was received via a ' + request.method + ' request at ' + timestamp + ' || \n';

			fs.appendFile('logs/consumer-log.txt', log, function (err) {
			  if (err) throw err;
			  console.log('The "data to append" was appended to file!');
			});
			var solvedExpression = qs.stringify({
				'msg': eval(post.msg)
			});
			var options = {
			  hostname: 'localhost',
			  port: 8000,
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/x-www-form-urlencoded',
			    'Content-Length': solvedExpression.length
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
			  });
			});


			req.on('error', function(e) {
			  console.log('problem with request: ' + e.message);
			});

			// write data to request body
			req.write(solvedExpression);
			req.end();
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

