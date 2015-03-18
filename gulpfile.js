'use strict';

var gulp   = require('gulp'),
	mocha = require('gulp-mocha')

gulp.task('unitTest', function () {
  gulp.src('./test/**/*.js', {cwd: __dirname})
    .pipe(mocha({ reporter: 'list' }));
});

gulp.task('test', ['unitTest']);
