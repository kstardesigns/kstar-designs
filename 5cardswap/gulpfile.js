const gulp = require('gulp');
const { watch, series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');

async function minifycss() {
  return gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

async function minifyjs() {
  return gulp.src('./scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
}

gulp.task('minifyjs', function(){
  return gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('public/js'))
});

exports.default = function() {
  watch('*.scss', minifycss);
  watch('*.js', minifyjs);
};