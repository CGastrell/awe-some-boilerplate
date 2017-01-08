var app = require('ampersand-app')
var XHR = require('libs/xhr')
var config = require('clientconfig')
var debug = require('debug')('app:action:auth')

module.exports = {
  authenticate: function (auth) {
    if (auth.result === false) {
      var emailExists = /Email already exists/.test(auth.message)
      if (emailExists) {
        app.alerts.danger('Email already exists')
      } else {
        app.alerts.danger('Login failed')
      }
      app.navigate('/?login')
    } else {
      var session = app.state.session
      session.create(auth)
      session.once('change:last_access', function () {
        if (auth.onboarding === true) {
          app.navigate('/welcome')
        } else {
          app.navigate('/home')
        }
      }, this)
    }
  },
  logout: function () {
    var token = app.state.session.access_token
    var url = [
      config.apiUrl,
      config.apiPaths.userLogout,
      '?access_token=' + token
    ].join('')

    app.store.session.destroy(function () {
      var done = function () {
        window.location.href = '/'
      }
      XHR({
        method: 'POST',
        url: url,
        done: function (session, xhr) {
          if (/2[0-9][0-9]/.test(xhr.status) === true) {
            debug('session closed')
          } else {
            debug('error closing session')
          }
          done()
        },
        fail: function (err, xhr) {
          debug('error closing session')
          debug(err)
          done()
        },
        timeout: 5000
      })
    })
  }
}
