var View = require('ampersand-view')
window.jQuery = require('jquery')
require('bootstrap')
require('bootstrap-tooltip')

module.exports = View.extend({
  autoRender: true,
  props: {
    target: ['any', true],
    view: ['state', true],
    events: ['object', false, function () {
      return {}
    }],
    title: 'string',
    triggeron: ['string', false, 'click'],
    placement: ['string', false, 'right'],
    viewport: ['string', false, 'body'],
    container: ['any', false, false]
  },
  template: require('./template.hbs'),
  render: function () {
    this.renderWithTemplate(this)

    var content = this.view.render()

    var $popover = this.$popover = $(this.target)
    this.$popover.popover({
      container: this.container,
      content: content.el,
      html: true,
      title: this.title,
      placement: this.placement,
      trigger: this.triggeron
    })

    var self = this
    for (var eventName in this.events) {
      var eventHandler = this.events[eventName]
      $popover.on(eventName, function () {
        eventHandler.apply(self, arguments)
      })
    }

    return this
  },
  remove: function () {
    this.$popover.popover('destroy')
    View.prototype.remove.apply(this, arguments)
  },
  show: function () {
    this.$popover.popover('show')
  },
  hide: function () {
    this.$popover.popover('hide')
  }
})
