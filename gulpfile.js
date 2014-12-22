var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bundler = watchify(browserify('./src/overlay.js', watchify.args));

var srcPaths = {
  scripts: 'src/**/*.js',
  styles: 'src/**/*.scss',
  markup: 'src/**/*.html'
};

var buildPath = 'build/'

gulp.task('scripts', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('overlay.js'))
      .pipe(buffer())
    .pipe(gulp.dest(buildPath));
}

gulp.task('styles', function () {
  gulp.src(srcPaths.styles)
    .pipe(sass())
    .pipe(gulp.dest(buildPath))
    .pipe(reload({ stream:true }));
});

gulp.task('markup', function() {
  gulp.src(srcPaths.markup)
    .pipe(gulp.dest(buildPath));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(srcPaths.styles, ['styles']);
  gulp.watch(srcPaths.markup, ['markup']);
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

gulp.task('build', ['browserify', 'styles', 'markup']);

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'styles', 'markup', 'serve']);