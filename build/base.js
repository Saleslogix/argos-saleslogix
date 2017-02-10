/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = function() {
  return {
    entry: {
      localization: './src/Bootstrap.localization.js',
      main: './src/main.js',
      vendor: ['sdata-client-dependencies', 'sdata-client', 'canvas2image', 'deepdiff', 'chart', 'page', 'L20n', 'react', 'react-dom', 'redux', 'snap', 'rxjs', 'moment', 'pouchdb-browser', '../../argos-sdk/libraries/Simplate.js', '@infor/icrm-js-common', '@infor/icrm-js-customization'],
    },
    output: {
      path: path.resolve(__dirname, '../deploy/dist'),
      publicPath: '/dist/',
      libraryTarget: 'umd',
      library: ['icrm', '[name]'],
      umdNamedDefine: true,
      filename: 'icrm.[name].js',
    },
    module: {
      noParse: [
        /sdata-client|canvas2image|deepdiff|chart|page|L20n/,
      ],
      rules: [{
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../configuration'),
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../../../argos-sdk/src'),
          /@infor/,
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015-without-strict',
              ],
              plugins: [
                'transform-react-jsx',
              ]
            },
          }
        ]
      }, {
        test: /(\.js)$/,
        include: path.resolve(__dirname, '../../../argos-sdk/libraries/dojo'),
        use: [
          { loader: 'dojo-webpack-loader' },
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'less-loader', options: { paths: ['content/css'] } }
        ]
      }, {
        test: /\.png$|\.gif$|\.ttf$|\.woff$|\.svg$|\.eot$|\.woff2$|\.json$/,
        loader: 'file-loader',
      }]
    },
    resolve: {
      alias: {
        dojo: path.resolve(__dirname, '../../../argos-sdk/libraries/dojo/dojo'),
        dijit: path.resolve(__dirname, '../../../argos-sdk/libraries/dojo/dijit'),
        argos: path.resolve(__dirname, '../../../argos-sdk/src'),
        'Sage/Platform/Mobile': path.resolve(__dirname, '../../../argos-sdk/src'),
        crm: path.resolve(__dirname, '../src'),
        'Mobile/SalesLogix': path.resolve(__dirname, '../src'),
        snap: path.resolve(__dirname, '../../../argos-sdk/libraries/snap/snap.js'),
        L20n: path.resolve(__dirname, '../../../argos-sdk/libraries/l20n/l20n.js'),
        page: path.resolve(__dirname, '../../../argos-sdk/libraries/pagejs-1.6.1/page.js'),
        chart: path.resolve(__dirname, '../../../argos-sdk/libraries/Chart.min.js'),
        deepdiff: path.resolve(__dirname, '../../../argos-sdk/libraries/deep-diff/deep-diff-0.2.0.min.js'),
        canvas2image: path.resolve(__dirname, '../../../argos-sdk/libraries/canvas2image.js'),
        'sdata-client': path.resolve(__dirname, '../../../argos-sdk/libraries/sdata/sdata-client-debug.js'),
        'sdata-client-dependencies': path.resolve(__dirname, '../../../argos-sdk/libraries/sdata/sdata-client-dependencies-debug.js'),
      },
      modules: [
        'node_modules',
      ],
      extensions: [
        '.js',
        '.jsx',
        '.json',
      ],
    },
    plugins: [
      // Necessary for dojo-webpack-loader to function (is a webpack 1 loader)
      new webpack.LoaderOptionsPlugin({
        options: {
          dojoWebpackLoader: {
            // We should specify paths to core and dijit modules because we using both
            dojoCorePath: path.resolve(__dirname, '../../../argos-sdk/libraries/dojo/dojo'),
            dojoDijitPath: path.resolve(__dirname, '../../../argos-sdk/libraries/dojo/dijit'),

            // Languages for dojo/nls module which will be in result pack.
            includeLanguages: ['en', 'ru', 'fr'],
          }
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['vendor', 'core'],
        filename: '[name].bundle.js'
      }),
    ],
  }
};
