var app = require('ampersand-app')
var Router = require('ampersand-router')
var qs = require('qs')

var HomePage = require('components/home-page')
var MyProfilePage = require('components/my-profile-page')
var PrivacyPolicyPage = require('components/privacy-policy-page')
var TermsAndConditionsPage = require('components/terms-and-conditions-page')
var RegistrationPage = require('components/registration-page')

var AuthActions = require('actions/auth')
var BasicAuthActions = require('actions/basic-auth')
var NavbarActions = require('actions/navbar')

module.exports = Router.extend({
  routes: {
    '': 'home',
    'login': 'login',
    'logout': 'logout',
    'registration/:result': 'registration',
    'myprofile': 'myprofile',
    'privacypolicy': 'privacypolicy',
    'termsandconditions': 'termsandconditions',
    '(*path)': 'catchAll'
  },
  home: function () {
    var args = arguments
    var action = args[0]

    if (action === 'login') {
      NavbarActions.startLogin()
    }

    if (action === 'resetpassword') {
      NavbarActions.resetPassword()
    }

    app.trigger('page.switch', new HomePage())
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  myprofile: function () {
    app.trigger('page.switch', new MyProfilePage())
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  privacypolicy: function () {
    app.trigger('page.switch', new PrivacyPolicyPage())
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  termsandconditions: function () {
    app.trigger('page.switch', new TermsAndConditionsPage())
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  registration: function () {
    var args = arguments
    var action = args[0]
    var path = args[1]
    var params = qs.parse(path)

    if (action === 'confirm') {
      if (!params.token) return app.navigate('')
      if (!params.uid) return app.navigate('')

      BasicAuthActions.confirmRegistration({
        'token': params.token,
        'uid': params.uid
      })
    } else if (action === 'success') {
      app.trigger('page.switch', new RegistrationPage())
    } else {
      app.navigate('')
    }
  },
  logout: function () {
    AuthActions.logout()
  },
  login: function (query) {
    var json = qs.parse(query)
    var auth = JSON.parse(json.data)
    AuthActions.authenticate(auth)
  },
  catchAll: function () {
    this.redirectTo('')
  }
})
