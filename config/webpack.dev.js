const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: "source-map",

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "/dist"),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /(\.css|\.sass)$/i,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
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
              sourceMap: true,
            }
          },
        ],
      },
    ],
  },
});
