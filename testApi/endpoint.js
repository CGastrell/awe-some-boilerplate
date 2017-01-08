var _ = require('lodash')

function Handlers (data) {
  function get (id) {
    return _.findWhere(data, {
      'id': parseInt(id + '', 10)
    })
  }

  this.fetchHandler = function (request, reply) {
    reply(data)
  }

  this.postHandler = function (request, reply) {
    var item = request.payload
    item.id = data.length
    data.push(item)
    reply(item).code(201)
  }

  this.getHandler = function (request, reply) {
    var found = get(request.params.id)
    reply(found).code(found ? 200 : 404)
  }

  this.deleteHandler = function (request, reply) {
    var found = get(request.params.id)
    if (found) data = _.without(data, found)
    reply(found).code(found ? 200 : 404)
  }

  this.putHandler = function (request, reply) {
    var found = get(request.params.id)
    if (found) _.extend(found, request.payload)
    reply(found).code(found ? 200 : 404)
  }
}

module.exports = function (server, name, data) {
  var endpoint = new Handlers(data)
  server.route({
    method: 'GET',
    path: `/${name}`,
    handler: endpoint.fetchHandler
  })

  server.route({
    method: 'POST',
    path: `/${name}`,
    handler: endpoint.postHandler
  })

  server.route({
    method: 'GET',
    path: `/${name}/{id}`,
    handler: endpoint.getHandler
  })

  server.route({
    method: 'DELETE',
    path: `/${name}/{id}`,
    handler: endpoint.deleteHandler
  })

  server.route({
    method: 'PUT',
    path: `/${name}/{id}`,
    handler: endpoint.putHandler
  })
}
