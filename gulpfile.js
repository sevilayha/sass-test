const gulp = require('gulp'),
  plugins  = require('gulp-load-plugins')(),
  merge2   = require('merge2');

const files = { 
  // css files -----------------------------------------------------------------
  cssLibs: [
    './node_modules/prism-themes/themes/prism-atom-dark.css'
  ],
  css: [
    './src/sass/**/*.scss'
  ],

  // js files ------------------------------------------------------------------
  jsLibs: [
    './node_modules/algoliasearch/dist/algoliasearch.min.js',
    './node_modules/autocomplete.js/dist/autocomplete.min.js',
  ],
  js: [
    './src/js/**/*.js'
  ]
};

/**
 * Styles Task
 */
gulp.task('styles', () => {
  return merge2(
    gulp.src(files.cssLibs)
        .pipe(plugins.concat('libs.min.css'))
        .pipe(plugins.cssmin()),
    gulp.src(files.css)
        .pipe(plugins.sass({
          outputStyle: 'compressed',
          includePaths: ['sass', 'node_modules/bootstrap-sass/assets/stylesheets']
        }))
        .on('error', plugins.sass.logError)
        .pipe(plugins.autoprefixer())
        .pipe(plugins.rename('styles.min.css'))
  )
    .pipe(plugins.concat('paint.min.css'))
    .pipe(gulp.dest('./dist/css'));    
});

/**
 * Scripts Task
 */
gulp.task('scripts', () => {
  return merge2(
    gulp.src(files.jsLibs)
        .pipe(plugins.concat('libs.min.js')),
        // .pipe(plugins.uglify()),
    gulp.src(files.js)
        .pipe(plugins.plumber())
        .pipe(plugins.babel({ presets: ['es2015'] }))
        .pipe(plugins.concat('spells.min.js'))
        .pipe(plugins.uglify())
  )
    .pipe(plugins.concat('magic.min.js'))
    .pipe(gulp.dest('./dist/js'));    
});

/**
 * Watch Task
 */
gulp.task('watch', ['styles', 'scripts'], () => {
  gulp.watch('./src/sass/**/*.scss', ['styles']);
  gulp.watch('./src/js/**/*.js', ['scripts']);
})

/**
 * Default Task
 */
gulp.task('default', ['styles', 'scripts']);