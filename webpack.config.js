/* eslint-disable */
var path = require('path');

module.exports = {
  devServer: {
    inline: true,
    proxy: {
      'http://localhost:8000/sdata': {
        target: {
          host: '172.16.247.47',
          protocol: 'http:',
          port: 80
        },
      }
    },
    contentBase: path.resolve(__dirname, '../../'),
    staticOptions: {
      index: 'index-dev.html'
    },
  },
  entry: ['../../argos-sdk/libraries/Simplate.js', './src/ApplicationModule.js', './src/Application.js', './src/Bootstrap'],
  output: {
    path: './dist',
    libraryTarget: 'umd',
    library: 'crm',
    umdNamedDefine: true,
    filename: 'crm.bundle.js',
  },
  externals: {
    '@infor/icrm-js-common': {
      commonjs: '@infor/icrm-js-common',
      commonjs2: '@infor/icrm-js-common',
      amd: '@infor/icrm-js-common',
      root: 'ICRMCommonSDK',
    },
    '@infor/icrm-js-customization': {
      commonjs: '@infor/icrm-js-customization',
      commonjs2: '@infor/icrm-js-customization',
      amd: '@infor/icrm-js-customization',
      root: 'ICRMCustomizationSDK',
    },
    rxjs: 'rxjs',
    moment: 'moment',
    pouchdb: 'PouchDB',
  },
  module: {
    loaders: [{
      test: /(\.js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /(\.js)$/,
      include: path.resolve(__dirname, '../../argos-sdk/libraries/dojo'),
      loader: 'dojo-webpack-loader',
    }],
  },
  resolve: {
    alias: {
      "dojo": path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dojo'),
      "dijit": path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dijit'),
      "argos": path.resolve(__dirname, '../../argos-sdk/src'),
      "Sage/Platform/Mobile": path.resolve(__dirname, '../../argos-sdk/src'),
      "crm": path.resolve(__dirname, './src'),
      "Mobile/SalesLogix": path.resolve(__dirname, './src'),
      "snap": path.resolve(__dirname, '../../argos-sdk/libraries/snap/snap.js'),
    }
  },
  resolveLoader: {
    modulesDirectories: [
      path.resolve(__dirname, './node_modules/')
    ]
  },
  dojoWebpackLoader: {
    // We should specify paths to core and dijit modules because we using both
    dojoCorePath: path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dojo'),
    dojoDijitPath: path.resolve(__dirname, '../../argos-sdk/libraries/dojo/dijit'),

    // Languages for dojo/nls module which will be in result pack.
    includeLanguages: ['en', 'ru', 'fr'],
  },
};
