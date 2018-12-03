const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist/'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      // { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.js$/, loader: 'babel-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
    ],
  },
  plugins: [new ExtractTextWebpackPlugin('[name].css')],
};
