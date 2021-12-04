const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    filename: "bundles/[name].[contenthash].bundle.js",
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      minSize: 0,
      maxInitialRequests: Infinity,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: (module) => {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `vendors/npm.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new LodashModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZER_MODE || "disabled",
    }),
  ],
});
