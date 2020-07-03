const path = require("path");

const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const rules = require("./rules");

const nodeConfig = {
  mode: "development",
  target: "node",
  entry: {
    main: ["babel-polyfill", "./server/index.js"],
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve("build"),
    filename: "server.js",
    library: "app",
    libraryTarget: "commonjs2",
    publicPath: "/",
  },
  module: {
    rules,
  },
  plugins: [
    // new CopyWebpackPlugin({
    //     patterns: [
    //       { from: "src/assets/img", to: "img" },
    //       { from: "static/**", to: "." },
    //     ],
    //   }),
    new webpack.ProvidePlugin({
      window: path.resolve(path.join(__dirname, "../../helpers/window.mock")),
      document: "global/document",
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    alias: {
      m: path.resolve("server/vendor/Model"),
      v: path.resolve("server/vendor/View"),
      c: path.resolve("server/vendor/Controller"),
    },
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
};

module.exports = [nodeConfig];
