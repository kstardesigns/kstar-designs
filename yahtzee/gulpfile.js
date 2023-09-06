const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
 
gulp.task('minify-css', () => {
  return gulp.src('./*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});