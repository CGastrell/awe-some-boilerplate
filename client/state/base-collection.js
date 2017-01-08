var AmpersandCollection = require('ampersand-rest-collection')
var FilterMixin = require('./ampersand-loopback-filter-mixin')
var AuthMixin = require('./ampersand-auth-mixin')
var extend = require('lodash/assign')

module.exports = AmpersandCollection.extend(
  FilterMixin, AuthMixin, {
    initialize: function (options) {
      this.defaultFilter = {}
      options || (options = {})
      if (options.childUrlPath) {
        this.url += '/' + options.childUrlPath
      }
      if (options.defaultFilter) {
        this.defaultFilter = options.defaultFilter
      }
    },
    fetch: function (options) {
      var query = {}
      if (this.defaultFilter) {
        query = {
          data: {
            // filter is how strongloop admit query
            filter: this.defaultFilter
          }
        }
      }
      return AmpersandCollection.prototype
        .fetch.call(this, extend(query, options))
    }
  }
)
