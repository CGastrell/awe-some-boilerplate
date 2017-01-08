var View = require('ampersand-view')
window.$ = window.jQuery = require('jquery')
var bootstrap = require('bootstrap')
var Modalizer = require('components/modalizer')
var template_hbs = require('./template.hbs')
var FormView = require('./form')

var NavbarActions = require('actions/navbar')

var debug = require('debug')('navbar:auth:signin')

module.exports = View.extend({
  initialize: function () {
    this.model = app.store.navbar
  },
  template: template_hbs,
  events: {
    'click button': 'onClickButton'
  },
  render: function () {
    var self = this
    this.renderWithTemplate(this)

    // prepare form view
    var form = new FormView()
    form.render()

    var modal = this.modal = new Modalizer({
      'title': 'Sign In',
      'bodyView': form,
      'class': 'auth-widget signin',
      'buttons': false,
      'onHidden': function () {
        debug('modal hidden')
        NavbarActions.finishLogin()
      }
    })

    this.listenTo(this.model, 'change:signingIn', function () {
      if (self.model.signingIn) {
        switch (this.model.signingIn) {
          case 'signIn':
            modal.title = 'Sign In'
            break
          case 'requestPasswordReset':
            modal.title = 'Reset Password'
            break
          case 'resetPassword':
            modal.title = 'Reset Password'
            break
          default:
            modal.title = 'Sign In'
            break
        }
        modal.show()
      } else {
        modal.hide()
      }
    })
  },
  onClickButton: function (event) {
    NavbarActions.startLogin()
  },
  remove: function () {
    this.modal.remove()
    View.prototype.remove.apply(this, arguments)
  }
})
