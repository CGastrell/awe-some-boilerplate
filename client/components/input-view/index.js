var InputView = require('ampersand-input-view')
var _ = require('lodash')

/**
 *
 * This is a custom template InputView
 * that use <div> instead of <label>
 *
 */
module.exports = InputView.extend({
  template: require('./template.hbs'),
  props: {
    styles: ['string', false, 'amp-input']
  },
  bindings: _.extend({}, InputView.prototype.bindings, {
    styles: {
      type: 'attribute',
      name: 'class'
    }
  })
})
