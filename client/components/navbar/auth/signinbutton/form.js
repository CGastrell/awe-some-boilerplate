var app = require('ampersand-app')
var View = require('ampersand-view')
var ViewSwitcher = require('ampersand-view-switcher')
var AlertView = require('../formalert')
var SignInView = require('./sign-in')
var RequestPasswordResetView = require('./request-password-reset')
var PasswordResetView = require('./password-reset')

module.exports = View.extend({
  template: '<div class="row" data-hook="auth-form-container"></div>',
  props: {
    currentView: ['string', false, 'signin']
  },
  events: {
    'click [data-hook=password-reset]': 'onClickPasswordReset'
  },
  initialize: function () {
    this.model = app.store.navbar
  },
  render: function () {
    this.renderWithTemplate(this)
    var switcher = new ViewSwitcher(this.queryByHook('auth-form-container'))
    var signIn = new SignInView()
    var requestPasswordReset = new RequestPasswordResetView()
    var passwordReset = new PasswordResetView()

    this.listenToAndRun(this.model, 'change:signingIn', function () {
      switch (this.model.signingIn) {
        case 'signIn':
          switcher.set(signIn)
          break
        case 'requestPasswordReset':
          switcher.set(requestPasswordReset)
          break
        case 'resetPassword':
          switcher.set(passwordReset)
          break
        default:
          switcher.set(signIn)
          break
      }
    })
  },
  bindAlertMessageView: function () {
    var alertMsg = this.alertMsg
    var alertView = this.alertView = new AlertView({'model': alertMsg})
    var container = this.queryByHook('alert-container')

    function renderAlertView () {
      alertView.render()
      container.appendChild(alertView.el)
    }
    function removeAlertView () {
      alertView.remove()
    }

    var self = this

    this.listenTo(alertMsg, 'change:enabled', function () {
      if (alertMsg.enabled) renderAlertView()
      else removeAlertView()
    })
    if (alertMsg.enabled) renderAlertView()
  }
})
