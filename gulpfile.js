var gulp = require('gulp'),
gutil = require('gulp-util'),
source = require('vinyl-source-stream'),
browserify = require('browserify'),
watchify = require('watchify'),
streamify = require('gulp-streamify'),
babelify = require('babelify'),
minify = require('gulp-minify')

gulp.task('default', function() {
  var bundler = watchify(browserify({
    entries: ['./src/main.jsx'],
    transform: [babelify],
    extensions: ['.es6', '.js', '.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  function build(file) {
    if(file) gutil.log('Recompiling ' + file);
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error'))
      .pipe(source('app.js'))
      //.pipe(streamify(minify()))
      .pipe(gulp.dest('./public/'))
  }

  build();
  bundler.on('update', build);
});
