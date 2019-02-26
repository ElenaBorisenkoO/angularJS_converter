const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
    }
  }, done);
});

gulp.task('bs-reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('build:js', function(done) {
  gulp.src('src/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./build/'));

  done();
});
gulp.task('build:css', function(done) {
  gulp.src('src/**/*.css')
    .pipe(gulp.dest('./build/'));

  done();
});
gulp.task('build:html', function(done) {
  gulp.src('*.html')
    .pipe(gulp.dest('./build/'));

  done();
});
gulp.task('build', gulp.series(
  'build:js',
  'build:css',
  'build:html',
  function(done) {
    done();
  }));
gulp.task('default', gulp.parallel('server', function(done) {
  gulp.watch(['index.html'], gulp.parallel('bs-reload'));
  gulp.watch(['src/*.js'], gulp.parallel('build:js', 'bs-reload'));
  gulp.watch(['src/**/*.css'], gulp.parallel('bs-reload'));
}));

