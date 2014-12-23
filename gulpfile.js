var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bundler = watchify(browserify('./src/index.js', watchify.args));

var paths = {
  scripts: 'src/**/*.js',
  styles: 'src/**/*.scss',
  markup: 'src/**/*.html'
};

var dest = 'build/'

// gulp.task('scripts', bundle); // so you can run `gulp js` to build the file
// bundler.on('update', bundle); // on any dep update, runs the bundler

// function bundle() {
//   return bundler.bundle()
//     // log errors if they happen
//     .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//     .pipe(source('index.js'))
//       .pipe(buffer())
//     .pipe(gulp.dest(dest));
// }

gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest(dest))
    .pipe(reload({ stream:true }));
});

gulp.task('markup', function() {
  gulp.src(paths.markup)
    .pipe(gulp.dest(dest));
});

gulp.task('scripts',function(){
  gulp.src(paths.scripts)
    .pipe(gulp.dest(dest))
  browserify('./src/index.js')
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(dest));
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.markup, ['markup']);
  gulp.watch(paths.scripts, ['scripts']);
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });

  gulp.task('watch')
});

gulp.task('build', ['scripts', 'styles', 'markup']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'styles', 'markup', 'serve']);