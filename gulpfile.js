const gulp = require('gulp')
  plugins  = require('gulp-load-plugins')();

gulp.task('styles', () => {
  return gulp.src('./sass/**/*.scss')
    .pipe(plugins.sass({
      outputStyle: 'compressed',
      includePaths: ['sass', 'node_modules/bootstrap-sass/assets/stylesheets']
    }))
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename('styles.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', () => {
  return gulp.src([
    './node_modules/algoliasearch/dist/algoliasearch.min.js',
    './node_modules/autocomplete/lib/autocomplete.js',
    './js/**/*.js'
  ])
    .pipe(plugins.plumber())
    .pipe(plugins.babel({ presets: ['es2015'] }))
    .pipe(plugins.uglify())
    .pipe(plugins.concat('spells.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', ['styles']);
})

gulp.task('default', ['styles']);