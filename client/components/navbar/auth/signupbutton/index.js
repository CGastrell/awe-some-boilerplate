var app = require('ampersand-app')
var View = require('ampersand-view')
window.$ = window.jQuery = require('jquery')
var bootstrap = require('bootstrap')
var Modalizer = require('components/modalizer')
var template_hbs = require('./template.hbs')
var FormView = require('./form')
var NavbarActions = require('actions/navbar')

var debug = require('debug')('component:navbar:registration')

module.exports = View.extend({
  initialize: function () {
    this.model = app.store.registration
  },
  template: template_hbs,
  events: {
    'click button': 'onClickButton'
  },
  render: function () {
    this.renderWithTemplate(this)

    // prepare form view
    var form = new FormView()
    form.render()

    var modal = this.modal = new Modalizer({
      'title': 'Register',
      'bodyView': form,
      'class': 'auth-widget signup',
      'buttons': false,
      'onHidden': function () {
        debug('modal hidden')
        NavbarActions.finishRegistration()
        modal.hide()
      }
    })

    var model = this.model
    this.listenTo(model, 'change:success', function () {
      if (model.success) {
        debug('registration success')
        modal.remove()
      }
    })
    this.listenTo(model, 'change:error', function () {
      if (model.error) {
        debug('registration failure')
      }
    })
    this.listenTo(model, 'change:inProgress', function () {
      if (model.inProgress) {
        debug('registration inProgress')
      }
    })
    this.listenTo(form, 'change:show', function (state) {
      if (!state.show) modal.hide()
    })
    this.listenTo(app.store.navbar, 'change:signingUp', function (state) {
      modal.show()
    })
  },
  onClickButton: function (event) {
    NavbarActions.startRegistration()
    this.modal.show()
  },
  remove: function () {
    this.modal.remove()
  }
})
