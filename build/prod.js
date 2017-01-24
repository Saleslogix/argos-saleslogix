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
          booleans: true,
          conditionals: true,
          comparisons: true,
          loops: true,
          unused: true,
          unsafe: false,
          if_return: true,
          join_vars: true,
          properties: true,
          collapse_vars: true,
          reduce_vars: true,
          drop_console: false,
          passes: 1,
        },
        comments: false,
        sourceMap: false,
      }),
    ],
  });
};
