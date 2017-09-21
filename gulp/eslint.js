"use strict";

var gulp = require("gulp");
var paths = gulp.paths;

const eslint = require("gulp-eslint");
const eslintAngular = require("eslint-plugin-angular");

gulp.task("eslint", function () {
    return gulp.src(paths.src + "/app/**/*.js")
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});