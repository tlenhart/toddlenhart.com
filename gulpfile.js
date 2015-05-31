/**
 * Created by todd on 5/23/2015.
 * gulpfile for toddlenhart.com
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var newer = require('gulp-newer');
var sass = require('gulp-sass');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');

var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var cdnizer = require('gulp-cdnizer');

var htmlreplace = require('gulp-html-replace');


var glob = require('glob');


// Live reload
gulp.task('connect', function(){
  connect.server({
    root: 'src/client',
    livereload: true
  });
});

// Don't think this is working for html files other than index.html
gulp.task('html', function() {
  gulp.src('./src/client/**/*.html')
    .pipe(connect.reload());
});

gulp.task('html:watch', function () {
  gulp.watch(['./src/client/**/*.html'], ['html']);
});

// Move libraries from /node_modules to /src/client/assets/lib/
// Doing this to help with deployment where a library does not load from the cdn.
gulp.task('load-libs', function () {
  gulp.src([
    './node_modules/angular/angular.js',
    './node_modules/angular-route/angular-route.js'
  ])
    // Might want to add gulp-newer here.
    .pipe(gulp.dest('./src/client/assets/lib/angular/'));
});

gulp.task('build-html', function () {
  gulp.src('./src/client/**/*.html', {base: "."})
    //.pipe(cdnizer([
    //  'google:angular@1.3.15',
    //  'google:angular-route@1.3.15'
    //]))
    .pipe(gulp.dest('./build/client/'));
});

gulp.task('cdnify', ['build-html', 'load-libs'], function() {
  gulp.src('./build/client/index.html')
    .pipe(cdnizer([
      'google:angular@1.3.15',
      'google:angular-route@1.3.15'
    ]))
    .pipe(gulp.dest('./build/client'));
  // Copy over the library assets folder (for fallback when cdns fail.)
  gulp.src('./src/client/assets/lib/**/*')
    .pipe(gulp.dest('./build/client/assets/lib/'));
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
  // Don't forget ng-min
  // Also going to want to minify everything (including images)
  // Convert the library links in the html to cdn versions.
  // Browserify maybe goes here as well...

  //gulp.src('./src/client/assets/bundles')
  //  .pipe()
});

gulp.task('css-min', ['sass'], function () {
  gulp.src(['./src/client/assets/css/cover.css',
            './src/client/assets/css/app.css',
            './src/client/assets/css/core.css'])
    // Put the start of sourcmaps here. Might need to go after the concat. Don't forget the write.
    .pipe(concat('app.css'))
    // Make sure the html is generated/pulled into build before enabling uncss. And that css loads are pointed correctly.
    //.pipe(uncss({
    //  html: ['./build/**/*.html']
    //}))
    // Consider using gulp-csso here.
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('./build/client/assets/css/'));
});




// Need build process. Should compile sass, minify, uglify, cdnify copy html, css, js to /build.

// Might want to add sass and js things to default so that they are run when gulp is first run.

gulp.task('default', ['connect', 'html:watch', 'sass:watch', 'js:watch', 'load-libs']);

// gulp develop task. Include the watchers and concatenations.
gulp.task('dev', ['connect', 'html:watch', 'sass:watch', 'js:watch', 'load-libs']);


// Include task for bundling all js files.
// build is responsible for compiling the code and testing it on the test server.
// The dist task is used to take stuff from build and put in the /dist folder for production.
gulp.task('build', ['build-html', 'js-min', 'css-min', 'load-libs']);


gulp.task('tests', ['build'], function () {
  // Run tests here.
});


// Needs testing.
// Might want to depend on build
gulp.task('dist', ['build', 'tests'], function () {
  gulp.src('./build/**/*')
    .pipe(gulp.dest('./dist/'))
});

// Push to gh-pages perhaps, or maybe just push to github, or both perhaps.
gulp.task('deploy', []);
