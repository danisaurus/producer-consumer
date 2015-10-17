var http = require('http');
var connect = require('connect');
var qs = require('querystring');


var postData = qs.stringify({
  'msg' : 'Hello World!'
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
req.write(postData);
req.end();

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

