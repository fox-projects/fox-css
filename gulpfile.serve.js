let { dest, parallel, series, src, watch } = require("gulp");
let concat = require("gulp-concat");

let postcss = require("gulp-postcss");
let postcssPresetEnv = require("postcss-preset-env");
let postCssSimpleVars = require("postcss-simple-vars");
let autoprefixer = require("autoprefixer");

let browserSync = require("browser-sync").create();

let postCssPlugins = [
  autoprefixer(),
  postcssPresetEnv(),
  postCssSimpleVars()
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
    src("src/**/*.css")
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
