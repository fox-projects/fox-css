let { dest, src } = require("gulp");
let concat = require("gulp-concat");
let postcss = require("gulp-postcss");
let del = require("del");

let postCssPlugins = [
  require("postcss-import")(),
  require("postcss-preset-env")(), // css future
  require("postcss-simple-vars")(), // sass-like variables
  require("autoprefixer")(),
  require("cssnano")()
];

async function build() {
  del.sync(["dist/*", "!dist"]);

  src("src/**/*.css")
    .pipe(concat("fox.css"))
    .pipe(postcss(postCssPlugins))
    .pipe(dest("dist"))
}

module.exports = {
  build
};