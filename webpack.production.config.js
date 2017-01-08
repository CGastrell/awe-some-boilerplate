'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin')

module.exports = {
  entry: [
    path.join(__dirname, 'client/app.js')
  ],
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'js/[name]-[hash].min.js',
    publicPath: '/'
  },
  resolve: {
    // root: [
    //   path.resolve('./client'),
    // ],
    alias: {
      'jquery': 'jquery/src/jquery',
      'jquery-ui': 'jquery-ui/jquery-ui.js'
      // 'jquery-ui-css': 'jquery-ui/../../themes/base'
    },
    modulesDirectories: [
      'node_modules',
      'client',
      'public',
      'node_modules/jquery-ui/themes/base'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('css/[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2
      // (Modules must be shared between 3 entries)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { 'presets': ['es2015', 'stage-0'] }
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      { test: /\.json?$/, loader: 'json' },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192&name=fonts/[name]-[hash].[ext]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=5000&name=images/[name]-[hash].[ext]'
      },
      {
        test: /\.css$/,
        // loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  }
  // postcss: [
  //   require('autoprefixer')
  // ]
}
