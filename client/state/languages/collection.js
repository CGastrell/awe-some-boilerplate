var BaseCollection = require('../base-collection')
var Language = require('./model')
var config = require('clientconfig')

module.exports = BaseCollection.extend({
  model: Language,
  url: config.apiUrl + '/api/languages'
})
