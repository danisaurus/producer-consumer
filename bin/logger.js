'use strict';
var fs = require('fs');

var Logger = function(){};

'use strict';
var fs = require('fs');

var Logger = function(){};

Logger.prototype.logSuccess = function(file, logInfo){
	var logStatement = logInfo.message + ' at ' + logInfo.timestamp + ' with body ' + logInfo.body + '\n';
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