var assert = require('assert'),
	http = require('http'),
	consumer = require('../consumer.js');




describe('consumer', function(){
	before(function() {
		server.listen(3000);
	});
	after(function() {
		server.close();
	});
})

describe('/', function() {
	it('should return 200', function(done) {
		http.get('http://localhost:3000', function (res) {
			assert.equal(200, res.statusCode);
			done();
		});
	});

	it('should respond with a valid number', function(done){
		http.get('http://localhost:3000', function(res) {
			var data = ''
			res.on('data', function (chunk){
				data += chunk;
			});
			res.on('end', function() {
				assert.equal(, data);
				done();
			})
		})
	})

})