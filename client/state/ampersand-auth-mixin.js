var app = require('ampersand-app')

module.exports = {
  ajaxConfig: function () {
    var accessToken = app.state.session.access_token
    return {
      headers: {
        'Authorization': accessToken
      },
      xhrFields: {
        'withCredentials': true
      }
    }
  }
}
