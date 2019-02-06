const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    darkread: './public/js/darkread.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  }
};
