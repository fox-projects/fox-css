let { serve } = require("./gulpfile.serve");
let { build } = require("./gulpfile.build");

exports.serve = serve;
exports.build = build;
exports.default = serve;
