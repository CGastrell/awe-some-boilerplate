var State = require('ampersand-state')
var FetchOptions = require('./fetch-options')
var extend = require('lodash/assign')

module.exports = State.extend({
  fetch: function (state, data, options) {
    state.fetch(FetchOptions(extend(
      {},
      (options || {}),
      {'data': (data || {})}
    )))
    return this
  }
})
