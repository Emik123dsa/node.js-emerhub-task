const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

const plugins = [
  new VueLoaderPlugin(),
  new VueSSRClientPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.SourceMapDevToolPlugin({
    filename: "main.js.map",
    exclude: ["bundle.js"],
  }),
  new HtmlWebpackPlugin({
    template: "static/index.html",
    inject: false,
    filename: "main.html",
  }),
  new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: false,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
];

module.exports = require("./../../webpack.config")({
  mode: "development",
  entry: {
    main: ["babel-polyfill", "./client/entry-client.js"],
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
