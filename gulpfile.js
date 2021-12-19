const { src, dest, series } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

const moveHTML = () => {
  return src("src/*.html").pipe(dest("dist/"));
};

exports.default = series(moveHTML);
exports.html = moveHTML;
