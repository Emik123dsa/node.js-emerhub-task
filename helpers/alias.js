const path = require("path");

const alias = [
  {
    "@": path.resolve("src"),
    "~": path.resolve("./"),
  },
];

module.exports = alias;
