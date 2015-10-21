var assert = require('assert'),
	ExpressionEvaluator = require('../bin/expression-evaluator.js'),
	expressionEvaluator = new ExpressionEvaluator();

var expression = '4+4';

describe ('expressionEvaluator', function(){
	it ('should evaluate a given mathematical expression', function() {
		assert.equal(8, expressionEvaluator.evaluate(expression));
	});
});