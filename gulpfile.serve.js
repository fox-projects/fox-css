let { dest, parallel, series, src, watch } = require("gulp");
let concat = require("gulp-concat");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let scss = require("postcss-scss");
let browserSync = require("browser-sync").create();

let postCssPlugins = [
  require("postcss-import")(),
  require("postcss-strip-inline-comments")(),
  require("postcss-simple-vars")(), // sass-like variables
  require("postcss-preset-env")(), // css future
  require("autoprefixer")()
];

async function init() {
  browserSync.init({ server: "samples" });
}

async function htmlReload() {
  watch("samples/*.html", { ignoreInitial: false }, async () => {
    browserSync.reload();
  });
}

async function cssInject() {
  let arg = process.argv[3];
  let isLight = arg === '--light';

  watch("src/**/*.css", { ignoreInitial: false }, async () => {
    if(isLight) {
      src(["src/theme.light.css"])
        .pipe(plumber())
        .pipe(concat("fox.css"))
        .pipe(postcss(postCssPlugins, { syntax: scss }))
        .pipe(dest("samples/styles"))
        .pipe(browserSync.stream());
    }
    else {
      src("src/theme.dark.css")
        .pipe(plumber())
        .pipe(concat("fox.css"))
        .pipe(postcss(postCssPlugins, { syntax: scss }))
        .pipe(dest("samples/styles"))
        .pipe(browserSync.stream());
    }
  });
}

let serve = series(init, parallel(htmlReload, cssInject));

module.exports = {
  serve
};
