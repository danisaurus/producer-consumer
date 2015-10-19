'use strict';
var ExpressionEvaluator = function(){};

ExpressionEvaluator.prototype.evaluate = function(expression){
	var answer = eval(expression);
	if (isFloat(answer)){
		return answer.toFixed(2);
	} else {
		return answer;
	}
};

function isFloat(number){
	if(Math.round(number) != number) {
		return true;
	}
}

module.exports = ExpressionEvaluator;