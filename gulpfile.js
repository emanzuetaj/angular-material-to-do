"use strict";

var gulp = require("gulp");
var argv = require("yargs").argv;

gulp.paths = {
    src: "src",
    dist: "wwwroot",
    tmp: "tmp"
};

gulp.settings = {
    minify: false,
    moduleName: "app"
};

require("require-dir")("./gulp");

gulp.task("default", ["build"], function () {
    gulp.paths.inc = argv.inc || gulp.paths.inc;
    gulp.settings.minJs = argv.minJs || gulp.settings.minJs;
});