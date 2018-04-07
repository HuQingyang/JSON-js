
const pkg = require('./package.json');
const path = require('path');

const libraryName = pkg.name;


module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    publicPath: '/',
    umdNamedDefine: true,
  },
  // mode: "production",
  module: {
    rules: [{
      test: /\.(js)$/,
      use: ['babel-loader'],
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
    }],
  },
  target: 'web'
};
