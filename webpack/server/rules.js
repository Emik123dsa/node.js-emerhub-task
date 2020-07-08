const autoprefixer = require("autoprefixer");

const rules = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: "vue-loader",
      },
    ],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          cacheDirectory: true,
        },
      },
    ],
  },
  {
    test: /\.sass$/,
    exclude: /node_modules/,
    use: [
      "vue-style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [autoprefixer],
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader",
        options: { sourceMap: true },
      },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      "vue-style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [autoprefixer],
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader",
        options: { sourceMap: true },
      },
    ],
  },
  {
    test: /\.css$/,
    use: [
      "vue-style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: [autoprefixer],
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /\.(gif)$/,
    use: "file-loader",
  },
  {
    test: /\.(jpe?g|ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
    use: "file-loader",
  },
  {
    test: /\.(png)$/,
    use: "file-loader",
  },
  {
    test: /\.html$/,
    use: "html-loader",
  },
  {
    test: /\.(mp4|webm|gif)$/,
    use: {
      loader: "url-loader",
      options: {
        limit: true,
      },
    },
  },
];

module.exports = rules;
