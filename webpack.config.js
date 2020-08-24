const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new CopyPlugin({
      patterns: [
        {
          from: 'src/css',
          to: 'css'
        },
        {
          from: 'src/images',
          to: 'images'
        }
      ],
    }),
  ],

  devServer: {
    hot: true,
    overlay: true,
    open: true
  }
};