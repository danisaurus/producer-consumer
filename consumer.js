var http = require('http');
var connect = require('connect');
var fs = require('fs');
var qs = require('querystring');


var server = http.createServer( function(request, response){
	if (request.method === 'POST') {
		var body = '';
		request.on('data', function(data){
			body += data;
		})
		request.on('end', function () {
			var post = qs.parse(body);
			console.log('This is the Post', post);
			fs.appendFile('/logs/consumer-log.json', post, function (err) {
			  if (err) throw err;
			  console.log('The "data to append" was appended to file!');
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
