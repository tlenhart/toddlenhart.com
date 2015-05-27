/**
 * Created by todd on 5/23/2015.
 * gulpfile for toddlenhart.com
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var newer = require('gulp-newer');
var sass = require('gulp-sass');

var concat = require('gulp-concat');

var glob = require('glob');
var StreamQueue = require('streamqueue');


// Live reload
gulp.task('connect', function(){
  connect.server({
    root: 'src/client',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('./src/client/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/client/*.html'], ['html']);
});


// SASS compilation
gulp.task('sass', function () {
  gulp.src('./src/client/assets/sass/**/*.scss')
    .pipe(sass().on('err', sass.logError))
    .pipe(gulp.dest('./src/client/assets/css'))
    .pipe(connect.reload());
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/client/assets/sass/**/*.scss', ['sass']);
});

// JS watcher (watches for changes in js files and concatenates the files into bundles for each component)
// These bundles are stored in /src/client/assets/bundles/
gulp.task('js', function () {
  var componentsFolders = glob.sync('./src/client/app/*/');
  // Add the parent directory (probably a better way to do this).
  componentsFolders.push('./src/client/app/');

  componentsFolders.forEach(function(folder) {
    var componentName = folder.match(/.+\/(.+)\/$/)[1];
    gulp.src([folder + '*.js', '!' + folder + '*.bundle.js'])
      .pipe(newer('./src/client/assets/bundles/'+componentName+'.bundle.js'))
      .pipe(concat(componentName + ".bundle.js"))
      .pipe(gulp.dest('./src/client/assets/bundles/'));
      //.pipe(connect.reload());
  });

  connect.reload();
});

gulp.task('js:watch', function() {
  // Try this at some point instead of having both watch tasks.
  //gulp.watch('./src/client/app/**/*.js');
  gulp.watch('./src/client/app/*/*.js', ['js']);
  gulp.watch('./src/client/app/*.js', ['js']);
});

// Need stuff for generating sourcemaps.
// https://www.npmjs.com/package/gulp-sass



gulp.task('js-min', ['js'], function () {
  // Might want to clean the build/ folder before running any tasks.
  // Add it as the first dependency.
  // Don't forget the html/templates, css (sass), js (ng-min, ... other Angular minification),
  // and any possible images.
  // Make sure any ordering is properly accounted for. (For the Angular code).
  // Also going to want to minify everything (including images)
  // Convert the library links in the html to cdn versions.
  gulp.src('./src/client/assets/bundles')
});


// Need build process. Should compile sass, minify, uglify, cdnify copy html, css, js to /build.

// Might want to add sass and js things to default so that they are run when gulp is first run.

gulp.task('default', ['connect', 'watch', 'sass:watch', 'js:watch']);

// gulp develop task. Include the watchers and concatenations.
gulp.task('dev', ['connect', 'watch', 'sass:watch', 'js:watch']);


// Include task for bundling all js files.
gulp.task('build', ['js-min', 'css-min']);


// Push to gh-pages perhaps, or maybe just push to github, or both perhaps.
gulp.task('deploy', []);
