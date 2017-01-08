var app = require('ampersand-app')

module.exports = {
  loginFailed: function (response) {
    app.navigate('/')
  },
  loginSuccess: function (response) {
    var session = response.session
    app.store.session.create(session)
    if (response.onboarding === true) {
      app.navigate('/welcome')
    } else {
      app.navigate('/home')
    }
  }
}
