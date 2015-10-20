var assert = require('assert'),
	expressionEvaluator = require('../bin/expression-evaluator.js');

var expression = '4+4';

describe ('expressionEvaluator', function(){
	it ('should evaluate a given mathematical expression', function() {
		assert.equal(expressionEvaluator.evaluate(expression), 8);
	});
});