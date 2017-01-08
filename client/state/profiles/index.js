var Collection = require('./collection')
var Model = require('./model')

exports.Collection = Collection
exports.Model = Model

var BaseState = require('../base-state')
var extend = require('lodash/assign')

exports.State = BaseState.extend({
  fetchProfile: function (filter, options) {
    options || (options = {})
    var data = { filter: extend({}, {
      limit: 1
    }, filter) }

    var profile = new Model()
    var collection = new Collection()

    var successFn = options.success
    options.success = function () {
      profile.set(collection.first()._values)
      if (successFn) successFn.call(this, arguments)
    }
    this.fetch(collection, data, options)

    return profile
  }
})
