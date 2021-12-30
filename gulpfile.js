import gulp from "gulp";
import imagemin from "gulp-imagemin";
import cssmin from "gulp-cssmin";
import fontmin from "gulp-fontmin";
import uglify from "gulp-uglify";
import {pipeline} from "readable-stream";
import htmlmin from "gulp-htmlmin";
import dartSass from "node-sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";

const sass = gulpSass(dartSass);

// const pipeline = require("readable-stream").pipeline;

gulp.task("sass", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({outputStyle: "compact"}).on("error", sass.logError))
    .pipe(
      autoprefixer(["last 10 versions", "> 1%", "ie 9", "ie 10"], {
        cascade: true,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task("javacomp", function () {
  return pipeline(gulp.src("app/js/*.js"), uglify(), gulp.dest("dist/js"));
});

gulp.task("fontminn", function (text) {
  return gulp
    .src("app/fonts/*")
    .pipe(
      fontmin({
        text: text,
      })
    )
    .pipe(gulp.dest("dist/fonts"));
});

gulp.task("htmlminff", () => {
  return gulp
    .src("app/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"));
});

gulp.task("imggg", () =>
  gulp.src("app/img/*").pipe(imagemin()).pipe(gulp.dest("dist/img"))
);

gulp.task("cssmins", function () {
  return gulp.src("app/css/*.css").pipe(cssmin()).pipe(gulp.dest("dist/css"));
});

gulp.task(
  "build",
  gulp.series(
    "htmlminff",
    "cssmins",
    "imggg",
    "javacomp",
    "fontminn",
    function () {}
  )
);
