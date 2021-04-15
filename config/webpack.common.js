const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry:  {
    'main': './src/index.js',
  },

  output: {
    path: path.join(__dirname, "../dist"),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
    ],
  },

  plugins: [

    // new CopyPlugin({
    //   patterns: [
    //     { from: "./src/img", to: "img" },
    //   ],
    // }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/img'),
          to: 'assets/img',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    new HtmlWebpackPlugin(
      {
        template: './public/index.html',
      }
    ),

    new VueLoaderPlugin(),
  ],
};