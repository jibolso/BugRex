var gulp       = require('gulp');
var babelify   = require('babelify');
var browserify = require('browserify');
var fs         = require('fs');
//var server     = require('./app');

var build = function () {
  var timer_name = "Build complete";
  console.time(timer_name);

  // from babel's example setup.
  // see https://babeljs.io/docs/setup/#browserify
  browserify({ debug: true })
    .transform(babelify, {presets: ["es2015", "react"]})
    .require("./app/client.js", { entry: true })
    .bundle()
    .on("error", function (err) {
      console.error("error: " + err.message);
    })
    .on('end', function() {
      console.timeEnd(timer_name);
    })
    .pipe(fs.createWriteStream("./public/bundle.js"));
};

gulp.task('build', function () {
  build();
});

//gulp.task('default', ['build']);

gulp.task('watch', function(){
 // console.log('starting watch');
  gulp.watch(["./app/components/*/*.js", "./app/components/*.js"], ['build']);
});

gulp.task('default', ['build', 'watch']);