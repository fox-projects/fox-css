import { dest, src } from "gulp";
<<<<<<< HEAD
import rename from "gulp-rename";
=======
import concat from "gulp-concat";
>>>>>>> parent of 2ea7ede... workflow: rework build step
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
<<<<<<< HEAD
  src("site/css/fox.dark.css")
=======
  src("src/theme.light.css")
    .pipe(concat("fox.light.min.css"))
>>>>>>> parent of 2ea7ede... workflow: rework build step
    .pipe(postcss(postCssPlugins, { syntax: scss }))
    .pipe(dest("dist"));

<<<<<<< HEAD
  src("site/css/fox.light.css")
=======
  src("src/theme.dark.css")
    .pipe(concat("fox.dark.min.css"))
>>>>>>> parent of 2ea7ede... workflow: rework build step
    .pipe(postcss(postCssPlugins, { syntax: scss }))
    .pipe(dest("dist"))
    .pipe(concat("fox.min.css"))
    .pipe(dest("dist"))
}

export default build;
