var app = require('ampersand-app')
var View = require('ampersand-view')
var FormView = require('ampersand-form-view')
var InputView = require('components/input-view')
var BasicAuthActions = require('actions/basic-auth')
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
  onClickButtonConfirm: function () {
    var form = this.form.data
    if (!form.password || !form.confirmation) {
      app.alerts.warning('Complete the form and try again')
      return
    }

    if (form.password != form.confirmation) {
      app.alerts.warning('Passwords do not match')
      return
    }

    BasicAuthActions.resetPassword({
      password: form.password,
      confirmation: form.confirmation
    })
  },
  render: function () {
    this.renderWithTemplate(this)
    var form, buttons

    buttons = new FormButtonsView({confirmButton: 'Send'})

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
        type: 'password',
        name: 'password',
        label: 'New password',
        placeholder: ''
      }),
      new InputView({
        type: 'password',
        name: 'confirmation',
        label: 'Confirmation',
        placeholder: ''
      })
    ]
  }
})
