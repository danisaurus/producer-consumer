'use strict';
var fs = require('fs');
var assert = require('assert');

var Logger = function(){};

Logger.prototype.logSuccess = function(file, logInfo){
	var logStatement = logInfo.message + ' at ' + logInfo.timestamp + ' with body ' + logInfo.body + '\n';
	logEvent(file, logStatement);
};

Logger.prototype.logError = function(file, logInfo){
	var logStatement = 'ERROR: There was a ' + logInfo.message + '\n';
	logEvent(file, logStatement);
};

function logEvent(file, logStatement) {
	fs.appendFile(file, logStatement, function (err) {
		if (err) throw err;
		console.log(logStatement);
	});
}

module.exports = Logger;