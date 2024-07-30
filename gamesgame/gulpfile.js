const gulp = require('gulp');
const { watch, series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');

async function minifycss() {
  return gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public'));
}

async function minifyjs() {
  return gulp.src('./server.js')
    .pipe(terser())
    .pipe(gulp.dest('public'))
    .pipe(gulp.dest('dist'));
}

exports.default = function() {
  watch('*.scss', minifycss);
  watch('*.js', minifyjs);
};