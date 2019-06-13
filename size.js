let fs = require("fs");

let date, size;
let files = ["fox.min.css"];


files.forEach(file => {
  date = Date.now();
  size = fs.statSync(`dist/${file}`).size;
  fs.appendFileSync("size.txt", file + " " + date + " " + size);
});
