var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    context: __dirname,

    entry: {
      main: [
        './morgoth/base/static/js/index.js',
        './morgoth/base/static/sass/style.scss'
      ]
    },

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name]-[hash].js',
        chunkFilename: '[id].bundle.js'
    },

    plugins: [
      new BundleTracker({ filename: './webpack-stats.json' }),
      new ExtractTextPlugin('[name]-[hash].css')
    ],

    module: {
      loaders: [
        {
          test: /(\.|\/)(jsx|js)$/,
          exclude: /node_modules/,
          loader: 'babel'
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap')
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader'
        }
      ]
    }
  }
];
