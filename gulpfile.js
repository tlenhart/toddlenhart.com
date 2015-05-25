/**
 * Created by todd on 5/23/2015.
 * gulpfile for toddlenhart.com
 */

var gulp = require('gulp');
var connect = require('gulp-connect');


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

gulp.task('default', ['connect', 'watch']);
