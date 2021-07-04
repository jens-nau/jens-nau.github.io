const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../docs"),
  },
  devtool: "source-map",
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, "docs"),
    hot: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },

      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // CSS
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images/",
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts/",
            },
          },
        ],
      },
    ],
  },
};
