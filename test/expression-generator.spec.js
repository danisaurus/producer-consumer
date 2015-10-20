var assert = require('assert'),
	expressionGenerator = require('../bin/expression-generator.js');

describe ('expressionGenerator', function(){
	it ('should return a string', function(){
		assert.equal(typeof(expressionGenerator.expression), 'string');
	});
	it ('should return a mathematical expression', function() {
		var pattern = new RegEx('\b\d+[\+\\\*\\/\\-]\d+\b');
		assert.ok(pattern.test(expressionGenerator.expression))
	});
})