const { merge } = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: 8080,
    host: "0.0.0.0",
    historyApiFallback: true,
  },
});
