import path from "path";
import fs from "fs";

import { dest, parallel, series, src, watch } from "gulp";
import concat from "gulp-concat";
import plumber from "gulp-plumber";
import inject from "gulp-inject";
import rename from "gulp-rename";
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

async function copyHtml() {
//   watch(["samples/*.html"], { ignoreInitial: false }, async function copyHtmlWatchArg() {
//     src(["samples/*.html", "!samples/index.html"])
//       .pipe(plumber())
//       .pipe(rename(path => {
//         return {
//           dirname: path.dirname,
//           basename: path.basename,
//           extname: ".pre" + path.extname
//         }
//       }))
//       .pipe(dest("site/dark"))
//       .pipe(dest("site/light"));

//     src(["samples/index.html"])
//       .pipe(plumber())
//       .pipe(rename('index.pre.html'))
//       .pipe(dest("site"))
//   })
}

async function copyCss() {
  // watch(["src/*.css"], { ignoreInitial: false }, async function copyCssWatchArgs() {
  //   src([""])
  // })
}

async function htmlReload() {
  watch(["samples/*.html"], { ignoreInitial: false }, async function htmlReloadWatchArg() {
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
  });
}
// async function htmlReload() {
//   watch(["site/**/*.pre.html"], { ignoreInitial: false }, async function htmlReloadWatchArg() {
//     src(["site/**/*.pre.html"])
//       .pipe(plumber())
//       .pipe(inject(src('css/fox.dark.css'), {
//         relative: true
//       }))
//       .pipe(rename(path => ({
//         dirname: path.dirname,
//         basename: path.basename.slice(0, -4),
//         extname: path.extname
//       })))
//       .pipe(dest("site"))
//     //   .pipe(dest("site/dark"))
//     //   .pipe(inject(src('site/css/fox.light.css'), {
//     //     relative: true
//     //   }))
//     //   .pipe(dest("site/light"));
    
//     src("../samples/index.html", {
//       cwd: path.join(__dirname, 'site')
//     })
//       .pipe(plumber())
//       .pipe(inject(src('site/css/fox.dark.css'), {
//         relative: false,
//         addRootSlash: false
//       }))
//       .pipe(dest("site"));
    
//     browserSync.reload();
//   });
// }

async function cssInject() {
  watch("src/*.css", { ignoreInitial: false }, async function cssInjectWatchArg() {
    src("src/theme.light.css")
      .pipe(plumber())
      .pipe(concat("fox.light.css"))
      .pipe(postcss(postCssPlugins, { syntax: scss }))
      .pipe(dest("site/css"))
      .pipe(browserSync.stream());

    src("src/theme.dark.css")
      .pipe(plumber())
      .pipe(concat("fox.dark.css"))
      .pipe(postcss(postCssPlugins, { syntax: scss }))
      .pipe(dest("site/css"))
      .pipe(browserSync.stream());
  });
}

const serve = series(parallel(copyHtml, copyCss), cssInject, htmlReload, init);

export default serve;
