const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: false,
    host: '0.0.0.0',
    port: 3000,
    publicPath: 'http://localhost:3000/',
    hotOnly: true,
    stats: 'minimal',
    historyApiFallback: true // will redirect 404s to /index.html, needed for client-side-routing
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom', // see https://github.com/gaearon/react-hot-loader/issues/1227
    },
  },
});
