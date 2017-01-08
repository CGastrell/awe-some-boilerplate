'use strict'
var app = require('ampersand-app')
var View = require('ampersand-view')
var ViewSwitcher = require('ampersand-view-switcher')
var SignInButton = require('./signinbutton')
var SignUpButton = require('./signupbutton')
var ProfileView = require('./profile')

var AuthenticationButtons = View.extend({
  template: require('./buttons.hbs'),
  subviews: {
    'signin': {
      selector: '[data-hook=signinbutton-container]',
      constructor: SignInButton
    },
    'signup': {
      selector: '[data-hook=signupbutton-container]',
      constructor: SignUpButton
    }
  }
})

module.exports = View.extend({
  initialize: function () {
    this.model = app.store.session
  },
  template: '<div data-hook="container" class="navbar-form navbar-right auth-component"></div>',
  render: function () {
    this.renderWithTemplate(this)

    this.buttons = new AuthenticationButtons()
    this.buttons.render()
    this.registerSubview(this.buttons)

    this.profile = new ProfileView()
    this.profile.render()
    this.registerSubview(this.profile)

    // init and configure our page switcher
    this.sessionSwitcher = new ViewSwitcher(this.queryByHook('container'))

    this.listenTo(this.model, 'change:active', this.onSessionChanges)
    this.onSessionChanges()
  },
  onSessionChanges: function (event) {
    if (this.model.active) {
      this.sessionSwitcher.set(this.profile)
    } else {
      this.sessionSwitcher.set(this.buttons)
    }
  }
})
