var View = require('ampersand-view')
var FormView = require('ampersand-form-view')
var InputView = require('components/input-view')
var BasicAuthActions = require('actions/basic-auth')
var FormButtonsView = require('components/formbuttons')
var SocialLoginView = require('../social-login')
var extend = require('lodash/assign')
var localLinks = require('local-links')
const app = require('ampersand-app')

var AcceptTermsInputView = InputView.extend({
  template: require('./accept-terms-input.hbs'),
  events: extend({}, InputView.events, {
    'click a[href]': 'onClickLink'
  }),
  onClickLink: function (e) {
    e.preventDefault()
    var localPath = localLinks.pathname(e)
    if (localPath) {
      this.parent.trigger('navigate')
      app.navigate(localPath)
    }
  }
})

module.exports = View.extend({
  template: require('./form.hbs'),
  props: {
    show: ['boolean', true, true]
  },
  events: {
    'click .form-buttons button[data-hook=confirm]': 'onClickButtonConfirm'
  },
  onClickButtonConfirm: function () {
    var form = this.form.data
    var terms = this.query('input[name=terms]')
    if (
      !form.email ||
      !form.password ||
      !terms.checked
    ) {
      app.alerts.warning('Complete the form and try again')
      return
    }

    BasicAuthActions.register({
      'email': form.email,
      'password': form.password
    })
  },
  render: function () {
    this.renderWithTemplate(this)
    var social, form, buttons
    social = new SocialLoginView({
      registered: true
    })
    this.renderSubview(
      social,
      this.queryByHook('social-container')
    )

    buttons = new FormButtonsView({ confirmButton: 'REGISTER' })
    this.renderSubview(buttons, this.queryByHook('buttons-container'))

    this.form = form = new SignUpFormView()
    this.listenTo(form, 'enterpress', function () {
      this.onClickButtonConfirm()
    })
    this.listenTo(form, 'navigate', function () {
      this.show = false
      this.show = true
    })
    this.renderSubview(form, this.queryByHook('form-container'))
  }
})

var SignUpFormView = FormView.extend({
  events: {
    'keypress': 'onKeyPress'
  },
  onKeyPress: function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      this.trigger('enterpress')
    }
  },
  fields: function () {
    return [
      new InputView({
        required: true,
        type: 'email',
        name: 'email',
        placeholder: 'Email'
      }),
      new InputView({
        required: true,
        type: 'password',
        name: 'password',
        placeholder: 'Password'
      }),
      new AcceptTermsInputView({
        parent: this,
        required: true,
        type: 'checkbox',
        name: 'terms',
        value: 'accepted',
        styles: 'amp-input terms',
        tests: [
          function () {
            if (!this.el) return false // not rendered yet
            var terms = this.query('input[name=terms]')
            return !terms.checked ? 'Accept the Terms of Use to continue' : false
          }
        ]
      })
    ]
  }
})
