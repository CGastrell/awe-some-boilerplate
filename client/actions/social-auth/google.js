var config = require('clientconfig')
var Auth = require('libs/auth-client')
var _ = require('lodash')
var BaseProvider = require('./base-provider')

module.exports = _.extend({}, BaseProvider, {
  login: function () {
    window.location = config.apiUrl + '/auth/google'
  },
  authenticate: function (code, done) {
    var verifyUrl = config.apiUrl + '/auth/google/callback?code=' + code
    var client = new Auth()
    var self = this

    client.verifyOAuthCode(
      verifyUrl,
      {},
      function (err, session, xhr) {
        if (err) {
          self.loginFailed({
            'error': err,
            'xhr': xhr
          })
        } else {
          self.loginSuccess({
            'session': session,
            'xhr': xhr
          })
        }
      }
    )
  }
})
