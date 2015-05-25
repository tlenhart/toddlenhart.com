/**
 * Created by todd on 5/23/2015.
 * gulpfile for toddlenhart.com
 */

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');


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

// Need stuff for generating sourcemaps.
// https://www.npmjs.com/package/gulp-sass


// Need build process. Should compile sass, minify, uglify, cdnify copy html, css, js to /build.

gulp.task('default', ['connect', 'watch', 'sass:watch']);

gulp.task('build', []);


// Push to gh-pages perhaps, or maybe just push to github, or both perhaps.
gulp.task('deploy', []);
