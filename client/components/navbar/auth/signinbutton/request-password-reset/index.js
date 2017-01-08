var app = require('ampersand-app')
var View = require('ampersand-view')
var FormView = require('ampersand-form-view')
var InputView = require('components/input-view')
var BasicAuthActions = require('actions/basic-auth')
var NavbarActions = require('actions/navbar')
var FormButtonsView = require('components/formbuttons')

module.exports = View.extend({
  initialize: function () {
    this.alertMsg = app.store.navbar.signInAlert
  },
  template: require('./template.hbs'),
  events: {
    'click .form-buttons button[data-hook=confirm]': 'onClickButtonConfirm',
    'click .form-buttons button[data-hook=cancel]': 'onClickButtonCancel'
  },
  onClickButtonCancel: function (e) {
    e.preventDefault()
    e.stopPropagation()
    NavbarActions.startLogin()
  },
  onClickButtonConfirm: function () {
    var form = this.form.data
    if (!form.email) {
      app.alerts.warning('Complete the form and try again')
      return
    }

    app.alerts.warning('we sent you an email with instructions to create your password')
    BasicAuthActions.resetPasswordRequest(form.email)
  },
  render: function () {
    this.renderWithTemplate(this)
    var form, buttons

    buttons = new FormButtonsView({
      confirmButton: 'Reset',
      cancelButton: 'Sign In'
    })

    this.renderSubview(buttons, this.queryByHook('buttons-container'))

    this.form = form = new ResetPasswordFormView()
    this.listenTo(form, 'enterpress', function () {
      this.onClickButtonConfirm()
    })
    this.renderSubview(form, this.queryByHook('form-container'))
  }
})

var ResetPasswordFormView = FormView.extend({
  events: {
    'keypress': 'onKeyPress'
  },
  onKeyPress: function (event) {
    if (event.keyCode == 13 || event.which == 13) {
      this.trigger('enterpress')
    }
  },
  fields: function () {
    return [
      new InputView({
        type: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'Email'
      })
    ]
  }
})
