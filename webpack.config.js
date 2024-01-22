const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/script.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devtool: "inline-source-map",
  // for live server reload
  devServer: {
    static: "./src",
  },
  optimization: {
    runtimeChunk: "single",
  },

  // grab html template from src
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: "./src/template.html",
    }),
  ],
  // importing css allowed
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
