const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
module.exports = require("./../../webpack.config")({
  entry: {
    main: ["babel-polyfill", "./client/entry-client.js"],
  },
  mode: "production",
  target: "web",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "static/index.html",
      filename: "main.html",
      inject: false,
    }),
    new TerserPlugin(),
    new VueLoaderPlugin(),
    new VueSSRClientPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
