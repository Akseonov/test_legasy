const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
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
  ],

  // devServer: {  // configuration for webpack-dev-server
  //   contentBase: './src/public',  //source of static assets
  //   port: 9000, // port to run dev-server
  // }
};