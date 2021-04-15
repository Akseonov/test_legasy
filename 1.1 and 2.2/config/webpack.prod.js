const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  module: {
    rules: [
      {
        test: /(\.css|\.sass)$/i,
        use: [
          "vue-style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      'browsers': ['> 1%', 'last 2 versions']
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              sassOptions: {
                indentedSyntax: true
              },
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "css/styles.css"}),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});