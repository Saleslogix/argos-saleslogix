/* eslint-disable */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const _base = require('./base.js');

module.exports = function(env) { // eslint-disable-line
  return webpackMerge(_base(), {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('prod'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
      }),
    ],
  });
};
