var app = require('ampersand-app')

var NavbarActions = {
  startLogin: function () {
    app.store.navbar.set('signingIn', 'signIn')
  },
  requestPasswordReset: function () {
    app.store.navbar.set('signingIn', 'requestPasswordReset')
  },
  resetPassword: function () {
    app.store.navbar.set('signingIn', 'resetPassword')
  },
  finishLogin: function () {
    app.store.navbar.set('signingIn', null)
  },
  startRegistration: function () {
    app.store.navbar.set('signingUp', true)
  },
  finishRegistration: function () {
    app.store.navbar.set('signingUp', false)
  }
}

module.exports = NavbarActions
