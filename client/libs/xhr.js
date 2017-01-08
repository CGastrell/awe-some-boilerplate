/**
 *
 * Simplified XHR wrapper.
 * Implemented options
 *
 * -------------
 * XHR options
 * -------------
 * method
 * url
 * responseType
 * headers
 *
 * -------------
 * XHR callbacks
 * -------------
 * done
 * fail
 *
 * -------------
 * XHR Events
 * -------------
 * onload
 * onerror
 * onabort
 * onprogress
 *
 */

var debug = require('debug')('lib:xhr')
var app = require('ampersand-app')

/**
 *
 * XMLHttpRequest proxy.
 *
 * @author Facundo
 * @param {Object} options
 * @return {XMLHttpRequest}
 *
 */
module.exports = function (options, callback) {
  callback || (callback = function () {})

  var xhr, accessToken,
    method = options.method,
    url = options.url

  xhr = new XMLHttpRequest()
  xhr.responseType = options.responseType || 'json'
  // include cookies and accept cross site cookies
  xhr.withCredentials = options.withCredentials || false

  var doneFn = function (ev) {
    var data = xhr.response
    debug('request done with status %s', xhr.status)
    options.done ? options.done(data, xhr) : null
    callback(null, xhr, xhr.response)
  }

  var failFn = function (ev) {
    var error = new Error(ev.description)
    error.xhr = xhr
    debug('request error %s', xhr.status)
    options.fail ? options.fail(error, xhr) : null
    callback(error, xhr, xhr.response)
  }

  var progressFn = function (ev) { }

  xhr.onload = options.onload || doneFn
  xhr.onerror = options.onerror || failFn
  xhr.onabort = options.onabort || failFn
  xhr.onprogress = options.onprogress || progressFn

  xhr.open(method, url)

  /**
   *
   * seting up headers
   *
   */
  var headers = options.headers
  if (headers) {
    for (var name in headers) {
      var header = headers[name]
      if (
        typeof header === 'string' &&
        typeof name === 'string'
      ) {
        xhr.setRequestHeader(name, header)
      }
    }
  }

  var data = ''
  if (options.jsonData) {
    data = JSON.stringify(options.jsonData)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  }

  if (accessToken == app.state.session.access_token) {
    xhr.setRequestHeader('Authorization', accessToken)
    xhr.withCredentials = true
  }

  xhr.send(data)
  return xhr
}
