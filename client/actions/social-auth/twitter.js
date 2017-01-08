var config = require('clientconfig')
module.exports = {
  login: function () {
    window.location = config.apiUrl + '/auth/twitter'
  },
  authenticate: function (code) {
  }
}
