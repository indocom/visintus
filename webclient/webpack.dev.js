const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    open: true,
    port: 3001,
    proxy: {
      "/api": "http://localhost:3000"
    }
  },
});
