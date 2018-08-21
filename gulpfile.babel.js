import gulp from 'gulp';
import gutil from 'gulp-util';
import jshint from 'gulp-jshint';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('build-css', () => gulp.src('source/scss/**/*.scss')
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/assets/stylesheets')))

gulp.task('build-js', () => gulp.src('source/javascript/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/assets/javascript')))

gulp.task('jshint', () => gulp.src('source/javascript/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish')));

gulp.task('watch', () => {
  gulp.watch('source/javascript/**/*.js', gulp.series('jshint'));
  gulp.watch('source/scss/**/*.scss', gulp.series('build-css'));
  gulp.watch('source/javascript/**/*.js', gulp.series('build-js'))
});

gulp.task('default', gulp.series('watch'));

// var gulp = require('gulp'),
//   gutil = require('gulp-util'),
//   jshint = require('gulp-jshint'),
//   sass = require('gulp-sass'),
//   concat = require('gulp-concat'),
//   sourcemaps = require('gulp-sourcemaps');

// gulp.task('build-css', function () {
//   return gulp.src('source/scss/**/*.scss')
//     .pipe(sass())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('public/assets/stylesheets'));
// })

// gulp.task('build-js', function () {
//   return gulp.src('source/javascript/**/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(concat('bundle.js'))
//     .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('public/assets/javascript'));
// })

// gulp.task('jshint', function () {
//   return gulp.src('source/javascript/**/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// gulp.task('watch', function () {
//   gulp.watch('source/javascript/**/*.js', gulp.series('jshint'));
//   gulp.watch('source/scss/**/*.scss', gulp.series('build-css'));
//   gulp.watch('source/javascript/**/*.js', gulp.series('build-js'))
// });

// gulp.task('default', gulp.series('watch'));
