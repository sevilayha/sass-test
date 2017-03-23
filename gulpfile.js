const gulp = require('gulp')
  plugins  = require('gulp-load-plugins')();

gulp.task('styles', () => {
  gulp.src('./sass/**/*.scss')
    .pipe(plugins.sass())
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer())
    .pipe(plugins.cssmin())
    .pipe(plugins.rename('styles.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', ['styles']);
})

gulp.task('default', ['styles']);