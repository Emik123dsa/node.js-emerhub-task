const path = require("path");

const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

const rules = require("./rules");

const nodeConfig = {
  mode: "development",
  target: "node",
  entry: {
    main: ["babel-polyfill", "./server/entry-server.js"],
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
    new VueLoaderPlugin(),
    new VueSSRServerPlugin(),
    new webpack.ProvidePlugin({
      window: path.resolve(path.join(__dirname, "../../helpers/window.mock")),
      document: "global/document",
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
};

const browserConfig = require("../client/webpack.client.dev.babel");

module.exports = [nodeConfig, browserConfig];
