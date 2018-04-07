
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    example: path.join(__dirname, './index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  // mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 2335,
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
};
