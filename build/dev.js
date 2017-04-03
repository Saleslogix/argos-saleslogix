/* eslint-disable */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const _base = require('./base.js');

let config;
try {
  config = require('../scripts/config.json');
} catch (e) {
  console.warn('WARNING:: Failed loading config.json, falling back to default.config.json. Copy the default.config.json to config.json for your environment.'); // eslint-disable-line
  config = require('../scripts/default.config.json');
}

const proxyConfig = config.proxy || {};

module.exports = function(env) {
  return webpackMerge(_base(), {
    output: {
      path: path.resolve(__dirname, '../deploy/dist'),
      publicPath: '/dist/',
    },
    plugins: [
      new webpack.DefinePlugin({
        FLAGS: {
          LITE: true,
        }
      }),
    ],
    devServer: {
      compress: true, // gzip compression
      inline: true,
      port: config.port || 8080,
      proxy: {
        '/sdata': {
          secure: false,
          target: {
            host: proxyConfig.host || 'localhost',
            protocol: proxyConfig.protocol || 'http',
            port: proxyConfig.port || 80,
          },
        },
      },
      https: true,
      contentBase: path.resolve(__dirname, '../../../'),
      staticOptions: {
        index: 'index-dev.html',
      },
    },
    devtool: false,//'inline-source-map',
  });
};
