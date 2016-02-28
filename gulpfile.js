var gulp       = require('gulp');
var babelify   = require('babelify');
var browserify = require('browserify');
var fs		   = require('fs');

gulp.task('watch', () => {
	gulp.watch(['./app/components/*/*.js', './app/components/*.js'], ['build']);
});

gulp.task('build', () => {
	browserify({ dedbug: true })
		.transform(babelify)
		.require('./app/client.js', { entry: true})
		.bundle()
		.on('error', err => console.log("Error: " + err.message))
		.pipe(fs.createWriteStream('./public/bundle.js'));
});

gulp.task('default', ['build', 'watch'])	;