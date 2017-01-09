var app = require('ampersand-app')
var config = require('clientconfig')
var XHR = require('libs/xhr')
var debug = require('debug')('app:action:basic-auth')

module.exports = {
  base64Encode: function (unencoded) {
    return new Buffer(unencoded || '').toString('base64')
  },
  login: function (options) {
    var username = options.username
    var password = options.password
    var headers = {
      'Authorization': 'Basic ' + this.base64Encode(username + ':' + password),
      'Accepts': 'application/json;charset=UTF-8'
    }

    var data = {
      'username': username,
      'password': password
    }

    function loginSuccess (session, xhr) {
      debug('login success')
      if (options.success) {
        options.success(session, xhr)
      }
    }

    function loginFailed (xhr) {
      debug('login failed')
      app.alerts.handleServerError(xhr)
      if (options.error) {
        options.error(null, xhr)
      }
    }

    XHR({
      'method': 'POST',
      'url': config.apiUrl + '/api/users/login',
      'headers': headers,
      'jsonData': data,
      'withCredentials': true,
      'done': function (session, xhr) {
        if (xhr.status === 200) {
          loginSuccess(session, xhr)
        } else {
          loginFailed(xhr)
        }
      },
      'fail': function (err, xhr) {
        debug(err)
        loginFailed(xhr)
      },
      'timeout': 5000
    })
  },
  register: function (options) {
    var headers = {
      'Accepts': 'application/json;charset=UTF-8'
    }

    XHR({
      'method': 'POST',
      'url': config.apiUrl + '/api/users',
      'headers': headers,
      'withCredentials': true,
      'jsonData': {
        'email': options.email,
        'password': options.password,
        'username': options.username || options.email
      },
      'done': function (data, xhr) {
        if (xhr.status === 200) {
          debug('registration success')
          options.success && options.success(data, xhr)
        } else {
          debug('registration failed')
          options.error && options.error(new Error(), xhr)
        }
      },
      'fail': function (err, xhr) {
        debug('registration failed')
        options.error && options.error(err, xhr)
      },
      'timeout': 5000
    })
  }
}
