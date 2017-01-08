var State = require('ampersand-state')
var AlertView = require('./view')
var extend = require('lodash/extend')

var ServerErrorType = {
  set: function (newVal) {
    if (newVal instanceof Error) {
      return {
        val: newVal,
        type: 'serverError'
      }
    }
    try {
      // try to parse it from passed in value:
      var errorData = new Error(newVal)

      return {
        val: errorData,
        type: 'serverError'
      }
    } catch (parseError) {
      // return the value with what we think its type is
      return {
        val: newVal,
        type: typeof newVal
      }
    }
  },
  compare: function (currentVal, newVal, attributeName) {
    if (!currentVal) return false
    if (currentVal !== newVal) return false
    if (!currentVal.footprint || !newVal.footprint) {
      return false
    }
    return currentVal.footprint === newVal.footprint
  }
}

var AlertsType = {
  set: function (newVal) {
    return {
      val: newVal,
      type: 'alerts'
    }
  },
  compare: function (currentVal, newVal, attributeName) {
    if (!currentVal) return false
    if (currentVal.footprint && newVal.footprint) {
      return currentVal.footprint === newVal.footprint
    }
    return false
  }
}

module.exports = State.extend({
  dataTypes: {
    serverError: ServerErrorType,
    alerts: AlertsType
  },
  props: {
    serverError: 'serverError',
    alerts: 'alerts',
    xhr: 'object'
  },
  initialize: function () {
    var self = this
    this.listenTo(this, 'change:serverError', function () {
      var error = self.serverError
      var message = (error.details && error.details.join('. ')) || error.message
      new AlertView({
        message: message || undefined,
        type: 'alert-warning',
        title: 'Something went wrong...'
      })
    })

    this.listenTo(this, 'change:alerts', function () {
      new AlertView(self.alerts)
    })
  },
  handleServerError: function (xhr) {
    if (xhr.response) {
      var response = xhr.response
      var error = new Error(response.error.message)
      extend(error, response.error)
      error.xhr = xhr
      error.footprint = Date.now()

      if (response.error && response.error.details) {
        var messages = response.error.details.messages
        var details = []
        for (var prop in messages) {
          var msg = messages[prop].join(', ')
          details.push(msg)
        }
        error.details = details
      }

      this.set('serverError', error)
    }
  },
  success: function (title, message) {
    new AlertView({
      title: title || undefined,
      message: message || undefined,
      type: 'alert-success'
    })
  },
  danger: function (title, message) {
    new AlertView({
      title: title || undefined,
      message: message || undefined,
      type: 'alert-danger'
    })
  },
  warning: function (title, message) {
    new AlertView({
      title: title || undefined,
      message: message || undefined,
      type: 'alert-warning'
    })
  },
  info: function (title, message) {
    new AlertView({
      title: title || undefined,
      message: message || undefined,
      type: 'alert-info'
    })
  }
})
