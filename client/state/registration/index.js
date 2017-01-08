var AmpersandState = require('ampersand-state')

module.exports = AmpersandState.extend({
  props: {
    inProgress: {
      'type': 'boolean',
      'default': false
    },
    success: 'boolean',
    error: 'boolean'
  },
  start: function () {
    this.set('inProgress', true)
  },
  finish: function () {
    this.set('inProgress', false)
    this.set('error', false)
    this.set('success', true)
  },
  failed: function (error) {
    this.set('inProgress', false)
    this.set('error', true)
    this.set('success', false)
  }
})
