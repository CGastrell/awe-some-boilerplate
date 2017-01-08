var SelectView = require('ampersand-select-view')
var extend = require('lodash/assign')

module.exports = SelectView.extend({
  template: [
    '<div class="select">',
    '<label data-hook="label"></label>',
    '<select></select>',
    '<span data-hook="message-container" class="message message-below message-error">',
    '<p data-hook="message-text"></p>',
    '</span>',
    '</div>'
  ].join('\n'),
  initialize: function (options) {
    options = extend({
      label: 'LANGUAGE',
      name: 'language',
      idAttribute: 'id',
      textAttribute: 'name',
      required: true
    }, options)
    this.styles = 'col-xs-12 amp-select'
    SelectView.prototype.initialize.apply(
      this,
      [options]
    )
  },
  props: {
    styles: 'string'
  },
  bindings: extend({}, SelectView.prototype.bindings, {
    styles: {
      type: 'attribute',
      name: 'class'
    }
  })
})
