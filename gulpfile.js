const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const header = require('gulp-header');
const del = require('del');
const pkg = require('./package.json');

const tpl = '/*!\n* autotyperjs v<%= version %>\n* A vanilla javascript plugin for animated typewriting.\n*\n* Author: <%= author %>\n*/\n';

// src and dist paths
const paths = {
  srcFile: './src/*.js',
  dist: './dist/'
};

// clean dist folder
gulp.task('clean', function () {
  return del(paths.dist);
});

// watch for changes of source file to build distributable file (only for stage environment)
gulp.task('watch', function () {
  return gulp.watch([paths.srcFile], gulp.series('build'));
});

// generate/build production file in dist folder
gulp.task('build', gulp.series('clean', function () {
  const sourcemaps = require('gulp-sourcemaps');

  return gulp.src(paths.srcFile)
    .pipe(sourcemaps.init())
    .pipe(
      header(
        tpl,
        {
          version: pkg.version,
          author: pkg.author
        }
      )
    )
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(
      header(
        tpl,
        {
          version: pkg.version,
          author: pkg.author
        }
      )
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
}));

// run gulp
gulp.task(
  'default',
  gulp.series(
    'clean',
    'build',
    'watch'
  )
);
