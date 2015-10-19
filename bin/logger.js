'use strict';
var fs = require('fs');
var assert = require('assert');

var Logger = function(){};

Logger.prototype.logSuccess = function(file, logInfo){
	
	assert.equal(typeof (file), 'string', "argument 'file' must be a string");
	assert.ok(!isNull(logInfo), 'logInfo can not be null');
	assert.ok(!isNull(logInfo.message), 'logInfo object must contain a message');
	assert.ok(!isNull(logInfo.timestamp), 'logInfo object must contain a timestamp');
	assert.ok(!isNull(logInfo.body), 'logInfo object must contain a body');

	var logStatement = logInfo.message + ' at ' + logInfo.timestamp + ' with body ' + logInfo.body + '\n';
	logEvent(file, logStatement);
};

Logger.prototype.logError = function(file, logInfo){
	assert.equal(typeof (file), 'string', "argument 'file' must be a string");
	assert.ok(!isNull(logInfo), 'logInfo can not be a null object');
	assert.ok(!isNull(logInfo.message), 'logInfo object must contain a message');

	var logStatement = 'ERROR: There was a ' + logInfo.message + '\n';
	logEvent(file, logStatement);
};

function logEvent(file, logStatement) {
	assert.equal(typeof (file), 'string', "argument 'file' must be a string");
	assert.equal(typeof (logStatment), 'string', "argument 'logStatement' must be a string");

	fs.appendFile(file, logStatement, function (err) {
		if (err) throw err;
		console.log(logStatement);
	});
}

module.exports = Logger;