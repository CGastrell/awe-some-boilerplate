var config = require('clientconfig')
var Auth = require('libs/auth-client')
var _ = require('lodash')
var BaseProvider = require('./base-provider')

module.exports = _.extend({}, BaseProvider, {
  login: function () {
    window.location = config.apiUrl + '/auth/facebook'
  },
  authenticate: function (code, done) {
    var verifyUrl = config.apiUrl + '/auth/facebook/callback?code=' + code
    var client = new Auth()
    var self = this

    client.verifyOAuthCode(
      verifyUrl,
      {},
      function (err, session, xhr) {
        if (err) {
          self.loginSuccess({
            'session': session,
            'xhr': xhr
          })
        } else {
          self.loginFailed({
            'error': err,
            'xhr': xhr
          })
        }
      }
    )
  }
})
