let fs = require("fs");

let date = Date.now();
let size = fs.statSync("dist/fox.min.css").size;

fs.appendFileSync("size.txt", date + " " + size);
