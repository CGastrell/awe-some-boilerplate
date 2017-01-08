var app = require('ampersand-app')

/**
 *
 * all private data store
 *
 */
var store = {
  profile: null
}

function fetch () {
  store.profile = app.store.session.profile
}

var State = function () {
  this.initialized = false
}

State.prototype = {
  initialized: false,
  get: function (options) {
    options || (options = {})
    if (!this.initialized || options.sync) {
      this.initialized = true
      fetch()
    }
    return store
  }
}

module.exports = State
