var AmpersandModel = require('ampersand-model')
var FilterMixin = require('./ampersand-loopback-filter-mixin')
var AuthMixin = require('./ampersand-auth-mixin')

module.exports = AmpersandModel.extend(FilterMixin, AuthMixin)
