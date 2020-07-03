const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const alias = require("../../helpers/alias");
const rules = require("./rules");

const nodeConfig = {
  target: "node",
  mode: "production",
  entry: "./server",
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
    alias: {
      m: path.resolve("server/vendor/Model"),
      v: path.resolve("server/vendor/View"),
      c: path.resolve("server/vendor/Controller"),
    },
    modules: [
      path.resolve("./app"),
      path.resolve(process.cwd(), "node_modules"),
    ],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"],
  },
};

module.exports = [nodeConfig];
