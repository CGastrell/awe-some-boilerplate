
exports.register = function (server, options, next) {
  require('./devs').api(server)
  next()
}

exports.register.attributes = {
  version: '0.1.0',
  name: 'test_api'
}
