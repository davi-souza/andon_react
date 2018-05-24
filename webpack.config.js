var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './build/static/js/main.7c4a2dc7.js',
  output: {
    path: path.resolve(__dirname, 'webpack'),
    filename: 'main.7c4a2dc7.js'
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    })
  ]
};
