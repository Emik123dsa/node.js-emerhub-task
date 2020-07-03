const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.SourceMapDevToolPlugin({
    filename: "main.js.map",
    exclude: ["bundle.js"],
  }),
  new HtmlWebpackPlugin({
    template: "static/index.html",
    filename: "main.html",
  }),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: false,
  }),
];

module.exports = require("../../webpack.config")({
  mode: "development",
  entry: {
    main: ["babel-polyfill", "./client/index.js"],
  },
  target: "web",
  output: {
    filename: "[name].dev.js",
    chunkFilename: "[name].dev.js",
  },
  plugins,
  devtool: "eval-source-map",
  perfomance: {
    hints: false,
  },
});
