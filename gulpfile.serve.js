import path from "path";

import { dest, parallel, series, src, watch } from "gulp";
import concat from "gulp-concat";
import plumber from "gulp-plumber";
import inject from "gulp-inject";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
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
  src(["samples/*.html", "!samples/index.html"])
    .pipe(inject(src('css/fox.dark.css', {
      cwd: path.join(__dirname, 'site')
    })))
    .pipe(dest("site/dark"));

  src(["samples/*.html", "!samples/index.html"])
    .pipe(inject(src('css/fox.light.css', {
      cwd: path.join(__dirname, 'site')
    })))
    .pipe(dest("site/light"));
  
  src("samples/index.html")
    .pipe(inject(src('css/fox.dark.css', {
      cwd: path.join(__dirname, 'site')
    })))
    .pipe(dest("site"));
  
  browserSync.reload();
}

async function htmlReloadWatch() {
  watch(["samples/*.html"], { ignoreInitial: false }, htmlReload);
}

async function cssInject() {
  src("src/theme.light.css")
    .pipe(plumber())
    .pipe(concat("fox.light.css"))
    .pipe(postcss(postCssPlugins, { syntax: scss }))
    .pipe(sourcemaps.write())
    .pipe(dest("site/css"))
    .pipe(browserSync.stream());

  src("src/theme.dark.css")
    .pipe(plumber())
    .pipe(concat("fox.dark.css"))
    .pipe(postcss(postCssPlugins, { syntax: scss }))
    .pipe(sourcemaps.write())
    .pipe(dest("site/css"))
    .pipe(browserSync.stream());
}

async function cssInjectWatch() {
  watch("src/*.css", { ignoreInitial: false }, cssInject);
}

const serve = series(cssInject, htmlReload, parallel(cssInjectWatch, htmlReloadWatch), init);

export default serve;
