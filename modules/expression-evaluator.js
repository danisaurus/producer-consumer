var util = require( "util" );


exports.evaluateExpression = evaluateExpression;

function evaluateExpression(expression){
	var result = eval(expression);
	return result;
}