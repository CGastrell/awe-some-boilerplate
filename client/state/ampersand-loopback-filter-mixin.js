var extend = require('lodash/assign')

var FetchOptions = function (input) {
  var output = {
    'success': function (data, response, options) { },
    'error': function (data, response, options) { }
  }
  return extend({}, output, input)
}

module.exports = {
  filteredFetch: function (filter, options) {
    options || (options = {})
    var data = { filter: filter || {} }
    this.fetch(FetchOptions(extend(
      {},
      (options || {}),
      {'data': (data || {})}
    )))
  }
}
