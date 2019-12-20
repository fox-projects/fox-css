import { dest, parallel, series, src, watch } from "gulp";
import concat from "gulp-concat";
import postcss from "gulp-postcss";
import plumber from "gulp-plumber";
import scss from "postcss-scss";
import bs from "browser-sync"

const browserSync = bs.create();

let postCssPlugins = [
  require("postcss-import")(),
  require("postcss-strip-inline-comments")(),
  require("postcss-simple-vars")(),
  require("postcss-preset-env")(),
  require("autoprefixer")()
];

async function init() {
  browserSync.init({ server: "site" });
}

async function htmlReload() {
  watch(["samples/*.html"], { ignoreInitial: false }, async function htmlReloadWatchArg() {
    src(["samples/*.html", "!samples/index.html"])
      .pipe(dest("site/dark"))
      .pipe(dest("site/light"));
    
    src("samples/index.html")
      .pipe(dest("site"));
    
    browserSync.reload();
  });
}

async function cssInject() {
  let arg = process.argv[3];

  watch("src/*.css", { ignoreInitial: false }, async function cssInjectWatchArg() {
    src("src/theme.light.css")
      .pipe(plumber())
      .pipe(concat("fox.css"))
      .pipe(postcss(postCssPlugins, { syntax: scss }))
      .pipe(dest("site/light/styles"))
      .pipe(browserSync.stream());

    src("src/theme.dark.css")
      .pipe(plumber())
      .pipe(concat("fox.css"))
      .pipe(postcss(postCssPlugins, { syntax: scss }))
      .pipe(dest("site/dark/styles"))
      .pipe(browserSync.stream());
  });
}

const serve = series(init, parallel(htmlReload, cssInject));

export default serve;
