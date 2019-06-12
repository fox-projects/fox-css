let { dest, parallel, series, src, watch } = require("gulp");
let postcss = require("gulp-postcss");
let browserSync = require("browser-sync").create();

async function initBrowserSync() {
  browserSync.init({ server: "./samples" });
}

async function reloadHtml() {
  browserSync.reload();
}

async function htmlReload() {
  watch("samples/*.html").on("change", reloadHtml);
}

async function injectCss() {
  src("src/**/*.css")
    .pipe(postcss())
    .pipe(dest("./dist"))
    .pipe(dest("./samples"))
    .pipe(browserSync.stream());
}

async function cssInject() {
  watch("src/**/*.css").on("change", injectCss);
}

let serve = series(initBrowserSync, reloadHtml, injectCss, parallel(htmlReload, cssInject));

exports.serve = serve;
exports.default = serve;
