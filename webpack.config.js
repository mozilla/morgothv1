const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    context: __dirname,

    entry: {
      main: [
        './client/ui/index.jsx',
        './client/ui/sass/style.scss',
      ],
    },

    output: {
      path: path.resolve('./assets/bundles/'),
      filename: '[name]-[hash].js',
      chunkFilename: '[id].bundle.js',
    },

    plugins: [
      new BundleTracker({ filename: './webpack-stats.json' }),
      new ExtractTextPlugin('[name]-[hash].css'),
    ],

    module: {
      loaders: [
        {
          test: /(\.|\/)(jsx|js)$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceMap'),
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'file-loader',
        },
      ],
    },
  },
];
