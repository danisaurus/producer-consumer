var http = require('http');
var connect = require('connect');

var app = connect();

app.use('/foo', function (req, res, next) {
	if (req.method === 'POST') {
		console.log('I am working');
	}
	next();
});


http.createServer(app).listen(3000);


// var server = http.createServer(
// );

// server.on("listening", function() {
// 	console.log('hello, i am listening');
// });

// server.listen('localhost', 8000);

