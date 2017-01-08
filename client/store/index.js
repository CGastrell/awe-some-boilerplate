// var debug = require('debug')('store');
var _ = require('lodash')

var Store = function () {
  return this
}

module.exports = Store

Store.prototype = {
  initialize: function (state) {
    _.extend(this, state)
  }
}
