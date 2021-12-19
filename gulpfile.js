const { src, dest, series } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const gulpWebpack = require("webpack-stream");

const moveHTML = () => {
  return src("src/*.html").pipe(dest("dist/"));
};

const moveCSS = () => {
  return src("src/style/*.css")
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/style/"));
};

const moveJS = () => {
  return src("src/script/*.js")
    .pipe(gulpWebpack({ mode: "production", output: { filename: "app.js" } }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/script/"));
};

exports.default = series(moveHTML, moveCSS, moveJS);
exports.html = moveHTML;
exports.css = moveCSS;
exports.js = moveJS;
