'use strict';
var fs = require('fs');

var Logger = function(){};

Logger.prototype.logSuccess = function(file, logInfo){
	var logStatement = 'A ' + logInfo.eventType + ' request was received at ' + logInfo.timestamp + ' with the expression ' + logInfo.message + '\n';
	logEvent(file, logStatement);
};

Logger.prototype.logRequestReceived = function(file, event){
	var logStatement = 'A ' + event.eventType + ' request was received at ' + event.timestamp + ' with the expression ' + event.message + '\n';
	logEvent(file, logStatement);
};

Logger.prototype.logRequestSent = function(file, event){
	var logStatement = 'A ' + event.eventType + ' request was sent at ' + event.timestamp + ' with the expression ' + event.message + '\n';
	logEvent(file, logStatement);
};

Logger.prototype.logResponseSent = function(file, event){
	var logStatement = 'A response was sent at ' + event.timestamp + ' with the answer ' + event.message + '\n';
	logEvent(file, logStatement);
};

Logger.prototype.logResponseReceived = function(file, event){
	var logStatement = 'A response was recieved at ' + event.timestamp + ' with the answer ' + event.message + '\n';
	logEvent(file, logStatement);
};

Logger.prototype.logError = function(file, event){
	var logStatement = 'ERROR: There was a ' + event.message + '\n';
	logEvent(file, logStatement);
};

function logEvent(file, logStatement) {
	fs.appendFile(file, logStatement, function (err) {
		if (err) throw err;
		console.log(logStatement);
	});
}

module.exports = Logger;