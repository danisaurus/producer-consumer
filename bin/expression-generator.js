'use strict';
var ExpressionGenerator = function(){};

ExpressionGenerator.prototype.arithmeticExpression = function(){
	var arithmeticExpression = [];
	arithmeticExpression.push(getRandomInteger());
	arithmeticExpression.push(getRandomOperation());
	arithmeticExpression.push(getRandomInteger());
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