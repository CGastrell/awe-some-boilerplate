var BaseCollection = require('../base-collection')
var config = require('clientconfig')
var Model = require('./model')

module.exports = BaseCollection.extend({
  model: Model,
  url: config.apiUrl + '/api/profiles'
})
