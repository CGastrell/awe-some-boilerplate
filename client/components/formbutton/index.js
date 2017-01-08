var View = require('ampersand-view')

var ButtonView = View.extend({
  props: {
    type: ['string', false, 'button'],
    text: 'string',
    class: ['string', false, 'btn btn-default'],
    disabled: 'boolean',
    onClick: 'any',
    state: 'state'
  },
  bindings: {
    'text': {
      type: 'text',
      hook: 'button'
    },
    'class': {
      type: 'attribute',
      name: 'class',
      hook: 'button'
    },
    'disabled': {
      type: 'booleanAttribute',
      hook: 'button',
      name: 'disabled'
    },
    'state.readonly': {
      type: 'toggle',
      hook: 'button',
      invert: true
    }
  },
  template: '<button data-hook="button"></button>',
  events: {
    'click [data-hook=button]': 'onClickButton'
  },
  onClickButton: function (event) {
    event.preventDefault()
    event.stopPropagation()
    var clickFn = this.onClick || function () {}
    clickFn.call(this, event)
  }
})

module.exports = ButtonView
