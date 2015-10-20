var assert = require('assert'),
	expressionGenerator = require('../bin/expression-generator.js');


describe ('expressionGenerator' function(){
	it ('should return a string') {
		assert.ok(typeof(expressionGenerator.expression), 'string');
	}
	
})