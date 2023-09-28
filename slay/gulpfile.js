'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
sass.compiler = require('node-sass');

gulp.task('sass', function () {
   return gulp.src('css/**/*.scss')
   .pipe(concat('styles.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
    gulp.watch('css/**/*.scss', gulp.series('sass'));
});