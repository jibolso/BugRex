var gulp       = require('gulp');
var babelify   = require('babelify');
var browserify = require('browserify');
var fs		   = require('fs');

function build(){
	var timer_name = "Build complete";
  	console.time(timer_name);
	browserify({ debug: true })
	    .transform(babelify)
	    .require("./app/client.js", { entry: true })
	    .bundle()
	    .on("error", function (err) {
	      console.error("error: " + err.message);
	    })
	    .on('end', function() {
	      console.timeEnd(timer_name);
	    })
	    .pipe(fs.createWriteStream("./public/bundle.js"));
}

gulp.task('watch', () => {
	gulp.watch(['./app/components/*/*.js', './app/components/*.js'], ['build']);
});

gulp.task('build', () => {
	build();
});

gulp.task('default', ['build', 'watch'])	;