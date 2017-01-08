var Endpoint = require('./endpoint')

var devs = [{
  id: 1,
  name: 'facugon'
}, {
  id: 2,
  name: 'cgastrell'
}, {
  id: 3,
  name: 'juansan'
}]

exports.data = devs

exports.api = function (server) {
  return new Endpoint(server, 'api/devs', devs)
}
