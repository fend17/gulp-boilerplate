const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['sass'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('sass', () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('autoprefix', () =>
  gulp
    .src('./css/*.css')
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('css'))
);
