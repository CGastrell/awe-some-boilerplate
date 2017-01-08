var AmpersandState = require('ampersand-state')

var Session = require('./session')
var Registration = require('./registration')
var MyProfile = require('./myprofile')
var Languages = require('./languages')

var State = AmpersandState.extend({
  extraProperties: 'allow'
})

module.exports = function () {
  return {
    navbar: new State({
      signingIn: false,
      signingUp: false,
      signInAlert: new State({
        enabled: false,
        message: '',
        type: 'alert'
      })
    }),
    biomodal: new State({
      enabled: false
    }),
    myprofile: new MyProfile(),
    languages: new Languages.State(),
    registration: new Registration(),
    session: new Session.State()
  }
}
