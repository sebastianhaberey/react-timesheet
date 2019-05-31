const path = require('path');
const webpack = require('webpack');

/* https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658 */

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(tx|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
    stats: 'minimal',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom', // see https://github.com/gaearon/react-hot-loader/issues/1227
    },
  },
};
