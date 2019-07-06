const path = require('path');
const webpack = require('webpack');

/* https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658 */

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    host: '0.0.0.0',
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    stats: 'minimal',
    historyApiFallback: true // will redirect 404s to /index.html, needed for client-side-routing
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom', // see https://github.com/gaearon/react-hot-loader/issues/1227
    },
  },
};
