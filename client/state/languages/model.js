var BaseModel = require('ampersand-model')
var config = require('clientconfig')

module.exports = BaseModel.extend({
  props: {
    id: 'string',
    code: 'string',
    name: 'string'
  },
  urlRoot: config.apiUrl + '/api/languages'
})
