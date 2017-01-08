var View = require('ampersand-view')

module.exports = View.extend({
  initialize: function () {
    var state = this.getInitalState()
    for (var prop in state) {
      if (this.hasOwnProperty(prop)) {
        var val = state[prop]
        this[prop] = val
      }
    }
  },
  getInitalState: function () {
    return {}
  }
})
