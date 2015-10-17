var util = require( "util" );

function getRandomInteger(){
	return Math.floor(Math.random() * 100);
}

var ExpressionGenerator = function(){};

ExpressionGenerator.prototype.arithmeticExpression = function(){
	var arithmeticExpression = [];
	arithmeticExpression.push(getRandomInteger());
	arithmeticExpression.push('+');
	arithmeticExpression.push(getRandomInteger());
	return arithmeticExpression.join('');
}




module.exports = ExpressionGenerator;