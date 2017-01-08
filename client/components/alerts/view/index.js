var View = require('ampersand-view')
window.$ = window.jQuery = require('jquery')
var bootstrap = require('bootstrap')

module.exports = View.extend({
  template: require('./template.hbs'),
  autoRender: true,
  props: {
    type: ['string', true, 'alert-success'],
    message: ['string', false],
    title: ['string', false],
    timeout: ['number', false, 3]
  },
  derived: {
    typeClass: {
      deps: ['type'],
      fn: function () {
        return this.type + ' alert alert-dismissible shadow fade in'
      }
    }
  },
  bindings: {
    message: {type: 'text', hook: 'message'},
    title: [{
      type: 'text', hook: 'title'
    }, {
      type: 'toggle', hook: 'title'
    }],
    typeClass: {type: 'attribute', name: 'class', hook: 'alert-type'}
  },
  render: function () {
    var self = this
    this.renderWithTemplate(this)
    $('body .alerts-container').html(this.el)

    var $alert = this.$alert = $('.alert')
    $alert.on('closed.bs.alert', function () { self.remove() })
    $alert.slideDown()

    window.setTimeout(function () {
      $alert.slideUp({
        complete: function () {
          $alert.trigger('closed.bs.alert')
        }
      })
    }, this.timeout * 1000)
  },
  remove: function () {
    this.$alert.remove()
    View.prototype.remove.call(this)
  }
})
