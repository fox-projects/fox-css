import { dest, src } from "gulp";
import concat from "gulp-concat";
import postcss from "gulp-postcss";
import scss from "postcss-scss";
import del from "del";

let postCssPlugins = [
  require("postcss-import")(),
  require("postcss-strip-inline-comments"),
  require("postcss-preset-env")(),
  require("postcss-simple-vars")(),
  require("autoprefixer")(),
  require("cssnano")()
];

async function build() {
  del.sync(["dist/*", "!dist"]);
  src("src/theme.light.css")
    .pipe(concat("fox.light.min.css"))
    .pipe(postcss(postCssPlugins, { syntax: scss }))
    .pipe(dest("dist"));

  src("src/theme.dark.css")
    .pipe(concat("fox.dark.min.css"))
    .pipe(postcss(postCssPlugins, { syntax: scss }))
    .pipe(dest("dist"))
    .pipe(concat("fox.min.css"))
    .pipe(dest("dist"))
}

export default build;
