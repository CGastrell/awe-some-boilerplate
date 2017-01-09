'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: '#inline-source-map',
  // devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'client/app.js')
  ],
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    // root: [
    //   path.resolve('./client'),
    // ],
    alias: {
      // 'jquery-ui': 'jquery-ui/jquery-ui.js'
      // 'jquery-ui-css': 'jquery-ui/../../themes/base'
    },
    modulesDirectories: [
      'node_modules',
      'client'
      // 'public',
      // 'node_modules/jquery-ui/themes/base'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin('css/[name]-[local]-[hash:6].css'),
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
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
        loader: 'url-loader?limit=8192&name=fonts/[name]-[hash:6].[ext]'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=5000&name=images/[name]-[hash:6].[ext]'
      },
      {
        test: /\.css$/,
        // loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  }
}
