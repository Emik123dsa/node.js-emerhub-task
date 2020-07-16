const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

const alias = require("../../helpers/alias");

const rules = require("./rules");

const nodeConfig = {
  target: "node",
  mode: "production",
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
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new VueSSRServerPlugin(),
    new TerserPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      window: path.resolve(path.join(__dirname, "../../helpers/window.mock")),
      document: "global/document",
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
};

const browserConfig = require("../client/webpack.client.prod.babel");

module.exports = [nodeConfig, browserConfig];
