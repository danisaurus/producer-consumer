var fs = require('fs');
var qs = require('querystring');



var logger = function(){};

function logEvent(file, logStatement) {
	fs.appendFile(file, logStatement, function (err) {
		if (err) throw err;
		console.log(logStatement);
	});
}

logger.prototype.logRequestReceived = function(file, object){
	var logStatement = 'A ' + event.eventType + ' request was received at ' + event.timestamp + ' with the expression ' + event.message + '\n';
	logEvent(file, logStatement);
}

logger.prototype.logRequestSent = function(file, object){
	var logStatement = 'A ' + event.eventType + ' request was sent at ' + event.timestamp + ' with the expression ' + event.message + '\n';
	logEvent(file, logStatement);
}

logger.prototype.logResponseSent = function(file, object){
	var logStatement = 'A response was sent at' + event.timestamp + ' with the answer ' + event.message + '\n';
	logEvent(file, logStatement);
}

logger.prototype.logResponseReceived = function(file, object){
	var logStatement = 'A response was recieved at' + event.timestamp + ' with the answer ' + event.message + '\n';
	logEvent(file, logStatement);
}

logger.prototype.logError = function(file, object){

}


module.export = new logger;