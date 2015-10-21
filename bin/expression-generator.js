'use strict';
var ExpressionGenerator = function(){};

ExpressionGenerator.prototype.arithmeticExpression = function(){
	
	var randomInteger1 = getRandomInteger(),
		randomInteger2 = getRandomInteger(),
		randomOperation = getRandomOperation(),
		arithmeticExpression = [];

	arithmeticExpression.push(randomInteger1);
	arithmeticExpression.push(randomOperation);
	arithmeticExpression.push(randomInteger2);
	
	return arithmeticExpression.join('');
};

function getRandomInteger(){
	return Math.floor((Math.random() * 100)+1);
};

function getRandomOperation(){
	var operations = ['+','-','*','/'];
	return operations[Math.floor(Math.random()*operations.length)];
};

module.exports = ExpressionGenerator;