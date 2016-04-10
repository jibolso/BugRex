var gulp       = require('gulp');
var sass       = require('gulp-sass');
var babelify   = require('babelify');
var browserify = require('browserify');
var fs         = require('fs');
var autoprefixer = require('gulp-autoprefixer');

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

gulp.task("heroku:production", function(){
    console.log('hello'); // the task does not need to do anything.
});

gulp.task('sass', function(){
  return gulp.src('./app/sass/application.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(gulp.dest('./public/css'))
});

gulp.task('watchSass', function(){
  gulp.watch('./app/sass/application.scss', ['sass']);
});


gulp.task('watch', function(){
  gulp.watch(['./app/components/*/*js', './app/components/*.js', './app/utils/*.js'], ['build']);
});

gulp.task('runServer', function(){
  var server = require('./app');
});

gulp.task('default', ['build', 'sass']);

gulp.task('dev', ['build', 'sass', 'runServer', 'watch', 'watchSass']);