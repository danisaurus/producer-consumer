var assert = require('assert'),
	ExpressionGenerator = require('../bin/expression-generator.js'),
	expressionGenerator = new ExpressionGenerator();


describe ('expressionGenerator', function(){
	it ('should return a string', function(){
		assert.equal(typeof(expressionGenerator.arithmeticExpression()), 'string');
	});
	it ('should return a mathematical expression', function() {
		var arithmeticExpression = expressionGenerator.arithmeticExpression(),
			pattern = new RegExp(\b\d+[\+\\\*\\\/\\\-]\d+\b);

		assert.ok(\b\d+[\+\\\*\\\/\\\-]\d+\b\i.test('4+4'));
	});
});