var util = require( "util" );


exports.createArithmeticExpression = createArithmeticExpression;


function getRandomInteger(){
	return Math.floor(Math.random() * 100);
}

function createArithmeticExpression() {
	var arithmeticExpression = [];

	arithmeticExpression.push(getRandomInteger);
	arithmeticExpression.push('+');
	arithmeticExpression.push(getRandomInteger);

	return arithmeticExpression.join('');
}

function postArithmeticExpression(callback){


	return http.post ({
		host: 'localhost:8000',
	}, function(response) {
		
	});
}