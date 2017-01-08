var View = require('ampersand-view')
var template = require('./template.hbs')

module.exports = View.extend({
  template: template,
  props: {
    'confirmButton': ['string', false, 'Confirm'],
    'cancelButton': ['string', false, 'Cancel'],
    'showConfirmButton': ['boolean', false, true],
    'showCancelButton': ['boolean', false, true]
  },
  bindings: {
    'cancelButton': { type: 'text', hook: 'cancel' },
    'showCancelButton': { type: 'toggle', hook: 'cancel' },
    'confirmButton': { type: 'text', hook: 'confirm' },
    'showConfirmButton': { type: 'toggle', hook: 'confirm' }
  },
  render: function () {
    this.renderWithTemplate(this)
  }
})
