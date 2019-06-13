let { dest, parallel, series, src, watch } = require("gulp");
let concat = require("gulp-concat");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let browserSync = require("browser-sync").create();

let postCssPlugins = [
  require("postcss-import")(),
  require("postcss-preset-env")(), // css future
  require("postcss-simple-vars")(), // sass-like variables
  require("autoprefixer")()
];

async function init() {
  browserSync.init({ server: "samples" });
}

async function htmlReload() {
  watch("samples/*.html", { ignoreInitial: false }, async () => {
    browserSync.reload();
  })
}

async function cssInject() {
  watch("src/**/*.css", { ignoreInitial: false }, async () => {
    src("src/main.css")
      .pipe(plumber())
      .pipe(concat("fox.css"))
      .pipe(postcss(postCssPlugins))
      .pipe(dest("samples/styles"))
      .pipe(browserSync.stream());
  })
}

let serve = series(init, parallel(htmlReload, cssInject));

module.exports = {
  serve
};
