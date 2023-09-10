const gulp = require('gulp');
const { watch, series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));

async function minifycss() {
  return gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

exports.default = function() {
  watch('*.scss', minifycss);
  //watch('src/*.js', series(clean, javascript));
};