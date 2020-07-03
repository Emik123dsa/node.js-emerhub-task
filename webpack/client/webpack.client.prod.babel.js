const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

module.exports = require("./../../webpack.config")({
  entry: [path.join(process.cwd(), "client/entry-client.js")],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  plugins: [
    new VueLoaderPlugin(),
    new VueSSRClientPlugin(),
    new TerserPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: "static/index.html",
      filename: "main.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
