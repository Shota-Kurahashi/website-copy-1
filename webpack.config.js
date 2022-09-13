const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: path.resolve(__dirname, "src"),
  },
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./javascripts/[name]-[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              //default: false
              sourceMap: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contenthash][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name]-[chunkhash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
