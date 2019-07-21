const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658 */
/* https://webpack.js.org/guides/production/ */

module.exports = {
  entry: {
    app: './src/index.jsx'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'react-timesheet',
      template: 'src/index.ejs',
      favicon: 'src/favicon.ico',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: ''
  },
  performance: {
    hints: false
  }
};
