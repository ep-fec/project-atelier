require('dotenv').config();
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js'
  },
  plugins: [new CompressionPlugin()],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}