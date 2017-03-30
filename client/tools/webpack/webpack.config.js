let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

import {paths} from "../config";

// multiple extract instances
let extractCSS = new ExtractTextPlugin('index.css');

module.exports = {
  // devtool: 'source-map',
  entry: {},
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel'},
      // {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'style!css'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: paths.htmlEntry,
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(paths.client) === -1;
      }
    })
  ]
};
