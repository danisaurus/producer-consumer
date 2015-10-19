var gulp = require('gulp-help')(require('gulp'));

gulp.task('jshint', 'Run JSHint static analysis against current working copy.', require('./gulp/jshint'), {
	aliases: ['lint']
});

gulp.task('jsbeautify', 'JSBeautify all the JavaScript files.', require('./gulp/jsbeautify'), {
	aliases: ['jsbeautifier', 'pretty', 'jspretty']
});

gulp.task('watch', 'Watch .js and .dust files for changes and rebuild when needed.', require('./gulp/watch'), {
	aliases: ['w']
});