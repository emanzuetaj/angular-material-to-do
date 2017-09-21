"use strict";

var gulp = require("gulp");

const del = require("del");
const mainBowerFiles = require("main-bower-files");
const uglifySaveLicense = require("uglify-save-license");
const series = require("stream-series");

const angularFileSort = require("gulp-angular-filesort");
const partialCache = require("gulp-angular-templatecache");
const concat = require("gulp-concat");
const filter = require("gulp-filter");
const sourceMaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const flatten = require("gulp-flatten");
const cleanCss = require("gulp-clean-css");
const rev = require("gulp-rev");
const inject = require("gulp-inject");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

var paths = gulp.paths;
var settings = gulp.settings;

gulp.task("clean", ["eslint"], function (cb) {
    del([paths.dist + "/", paths.tmp + "/"]).then(function () {
        cb();
    });
});

gulp.task("vendor:js", ["clean"],  function () {
    return gulp.src(mainBowerFiles())
        .pipe(filter("**/*.js"))
        .pipe(gulpIf(settings.minify, sourceMaps.init()))
        .pipe(gulpIf(settings.minify, uglify({ preserveComments: uglifySaveLicense })))
        .pipe(concat("vendor.js"))
        .pipe(rev())
        .pipe(gulpIf(settings.minify, sourceMaps.write()))
        .pipe(gulp.dest(paths.dist + "/scripts/"));
});

gulp.task("vendor:i18n", ["clean"], function () {
    return gulp.src("bower_components/angular-i18n/angular-locale_*.js")
        .pipe(gulp.dest(paths.dist + "/assets/angular-i18n/"));
});

gulp.task("vendor:css", ["clean"], function() {
    return gulp.src(mainBowerFiles({ checkExistance: true }))
      .pipe(filter("**/*.css"))
      .pipe(cleanCss({ compatability: 'ie8' }))
      .pipe(concat("vendor.css"))
      .pipe(rev())
      .pipe(gulp.dest(paths.dist + "/styles/"));
});

gulp.task("vendor:fonts", ["clean"], function () {
    return gulp.src("bower_components/airproducts.globalit.bootstrap/dist/fonts/**/*")
      .pipe(gulp.dest(paths.dist + "/fonts/"));
});

gulp.task("vendor:images", ["clean"], function() {
    return gulp.src("bower_components/airproducts.globalit.bootstrap/dist/img/**/*")
      .pipe(gulp.dest(paths.dist + "/img/"));
});

gulp.task("app:templateCache", ["clean"], function () {
    return gulp.src(paths.src + "/app/components/**/*.html")
        .pipe(partialCache("partials.js", {
            module: settings.moduleName
        }))
        .pipe(gulp.dest(paths.tmp + "/partials/"));
});

gulp.task("app:js", ["app:templateCache", "clean"], function() {
    return gulp.src([
            paths.src + "/app/**/*.js",
            paths.tmp + "/partials/**/*.js"])
        .pipe(angularFileSort())
        .pipe(gulpIf(settings.minify, sourceMaps.init()))
        .pipe(gulpIf(settings.minify, uglify()))
        .pipe(concat("app.js"))
        .pipe(rev())
        .pipe(gulpIf(settings.minify,sourceMaps.write()))
        .pipe(gulp.dest(paths.dist + "/scripts/"))
});

gulp.task("app:css", ["clean"], function () {
    var options = {
        style: "expanded",
        errLogToConsole: true,
        sourceMap: true,
        precision: 8
    };

    return gulp.src([paths.src + "/**/*.scss"])
        .pipe(sass(options).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(concat("app.css"))
        .pipe(rev())
        .pipe(gulp.dest(paths.dist + "/styles/"))
});

gulp.task("app:images", ["clean"], function () {
    return gulp.src(paths.src + "/assets/images/**/*")
      .pipe(gulp.dest(paths.dist + "/assets/images/"));
});

gulp.task("app:icons", ["clean"], function () {
    return gulp.src(paths.src + "/**/*.ico")
      .pipe(gulp.dest(paths.dist + "/"));
});

gulp.task("build", ["clean", "app:js", "app:css", "app:images", "app:icons", "vendor:js", "vendor:css", "vendor:fonts", "vendor:i18n", "vendor:images"], function () {
    var target = gulp.src(paths.src + "/index.html");
    var vendor = gulp.src([
        paths.dist + "/scripts/vendor*.js",
        paths.dist + "/styles/vendor*.css"], {
            read: false
        });
    var app = gulp.src([
        "!" + paths.dist + "/scripts/vendor*.js",
        paths.dist + "/scripts/**/*.js",
        paths.dist + "/styles/**/*.css"], {
            read: false
        });
    var options = {
        ignorePath: paths.dist,
        addRootSlash: false
    };

    return target.pipe(inject(series(vendor, app), options))
        .pipe(gulpIf(settings.minify, htmlmin({ collapseWhitespace: true })))
        .pipe(gulp.dest(paths.dist + "/"));
});