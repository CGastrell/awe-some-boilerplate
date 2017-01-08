var View = require('ampersand-view')
var alert_hbs = require('./alert.hbs')

var AlertView = View.extend({
  template: alert_hbs,
  bindings: {
    'model.message': {
      type: 'text',
      hook: 'message'
    },
    'model.type': {
      type: 'attribute',
      name: 'class',
      hook: 'type'
    }
  }
})

module.exports = AlertView
