const path = require("path");
module.exports = {
  alias: {
    "/@/": path.resolve(__dirname, "./src"),
  },
  build: {
    minify: false
  },
  assetsDir: "assets",
  base: "./",
};
