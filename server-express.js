'use strict'

/* eslint no-console: 0 */

const config = require('getconfig')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')

const isDeveloping = process.env.NODE_ENV !== 'production'
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))

const cookieParser = require('cookie-parser')
app.use('*', cookieParser(config.cookie.secret))
app.use('*', function (req, res, next) {
  res.cookie('config', JSON.stringify(config.client))
  next()
})

app.use('/config', (req, res) => {
  res.json(config.client)
})

if (isDeveloping) {
  const compiler = webpack(webpackConfig)
  const middleware = webpackMiddleware(compiler, {
    // publicPath: webpackConfig.output.publicPath,
    publicPath: webpackConfig.output.publicPath,
    // contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*', function response (req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')))
    res.end()
  })
} else {
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*', function response (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  })
}

app.listen(config.http.port, config.http.listen, function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info(
    '==> 🌎 Listening on port %s. Open up http://%s:%s/ in your browser.',
    config.http.port,
    config.http.listen,
    config.http.port
  )
})
// var server = new Hapi.Server();
// server.connection({
//   'host': config.http.listen,
//   'port': config.http.port
// });
//
// // set client config route
// server.route({
//   method:'GET',
//   path:'/config',
//   handler: (request,reply) => {
//     var clientConfig = JSON.stringify(config.client);
//     return reply(clientConfig).type('application/json');
//   }
// });
//
// server.register(Vision, (err) => {
//   server.views({
//     engines: {
//       handlebars: require('handlebars')
//     },
//     relativeTo: __dirname,
//     path: 'templates'
//   });
// });
//
// //
// // COOKIE
// //
// var clientConfig = JSON.stringify(config.client);
// server.state('config', config.cookie);
// server.ext('onPreResponse', function(request, reply) {
//   if (!request.state.config) {
//     var response = request.response;
//     return reply(response.state('config', encodeURIComponent(clientConfig)));
//   }
//   return reply.continue();
// });
//
// var moonbootsPlugin = {
//   'register': MoonBootsHapi.register,
//   'options': moonbootsConfig
// };
// var testApiPlugin = { 'register': require('./testApi') };
// var staticRoutesPlugin = { 'register': staticRoutes };
//
// var plugins = [moonbootsPlugin, staticRoutesPlugin];
// //if(config.isDev) plugins.push(testApiPlugin);
// plugins.push(testApiPlugin);
//
// // require moonboots_hapi plugin
// server.register(plugins, function (err) {
//   if (err) throw err;
//   // If everything loaded correctly, start the server:
//   server.start(function (err) {
//     if (err) throw err;
//     logger(
//       'Single page app running at: http://' +
//         config.http.listen + ':' + config.http.port
//     );
//   });
// });
//
// server.on('response', function(request){
//   logger(
//     request.info.remoteAddress + ': ' +
//       request.method.toUpperCase() + ' ' +
//       request.url.path + ' --> ' +
//       request.response.statusCode
//   );
//   logger('headers : %j', request.headers);
// });
