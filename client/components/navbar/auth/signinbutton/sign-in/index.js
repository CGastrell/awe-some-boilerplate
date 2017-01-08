var app = require('ampersand-app')
var View = require('ampersand-view')
var SocialLoginView = require('../../social-login')
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
    'click [data-hook=password-reset]': 'onClickPasswordReset'
  },
  onClickPasswordReset: function (e) {
    e.preventDefault()
    e.stopPropagation()
    NavbarActions.requestPasswordReset()
  },
  onClickButtonConfirm: function () {
    var form = this.form.data
    if (!form.email || !form.password) {
      app.alerts.warning('Complete the form and try again')
      return
    }

    BasicAuthActions.login({
      'email': form.email,
      'password': form.password
    })
  },
  render: function () {
    this.renderWithTemplate(this)
    var social, form, buttons

    social = new SocialLoginView()
    this.renderSubview(social, this.queryByHook('social-container'))

    buttons = new FormButtonsView({confirmButton: 'Sign In'})
    this.renderSubview(buttons, this.queryByHook('buttons-container'))

    this.form = form = new SignInFormView()
    this.listenTo(form, 'enterpress', function () {
      this.onClickButtonConfirm()
    })
    this.renderSubview(form, this.queryByHook('form-container'))
  }
})

var SignInFormView = FormView.extend({
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
        placeholder: 'Email'
      }),
      new InputView({
        type: 'password',
        name: 'password',
        placeholder: 'Password'
      })
    ]
  }
})
