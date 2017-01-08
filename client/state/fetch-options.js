var extend = require('lodash/assign')

/**
 *
 * this is just to define base options for every request
 *
 */
module.exports = function (input) {
  var output = {
    'success': function (data, response, options) { },
    'error': function (data, response, options) { }
  }
  return extend({}, output, input)
}
