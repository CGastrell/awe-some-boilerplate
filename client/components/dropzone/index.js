var View = require('ampersand-view')
var Dropzone = require('dropzone')
Dropzone.autoDiscover = false
var debug = require('debug')('dropzone')

module.exports = View.extend({
  props: {
    maxFiles: ['number', false, 1],
    maxFilesize: ['number', false, 10],
    parallelUploads: ['number', false, 1],
    uploadMultiple: ['boolean', false, false],
    addRemoveLinks: ['boolean', false, true],
    autoProcessQueue: ['boolean', false, true],
    method: ['string', false, 'POST'],
    hideSaveButton: ['boolean', false, false],
    fileTypes: ['array', false, function () { return [] }],
    url: ['any', false, function () {
      debug('url not set yet. remember to use a funtion!')
      return ''
    }],
    dzEvents: ['object', false, function () { return {} }],
    type: 'string'
  },
  session: {
    dropzone: 'object'
  },
  derived: {
    enableSaveButton: {
      deps: ['autoProcessQueue'],
      fn: function () {
        return !this.autoProcessQueue && !this.hideSaveButton
      }
    },
    acceptedFiles: {
      deps: ['fileTypes'],
      fn: function () {
        return this.fileTypes.join(',')
      }
    }
  },
  bindings: {
    enableSaveButton: {
      type: 'toggle',
      hook: 'save-button'
    }
  },
  template: require('./template.hbs'),
  events: {
    'click button[data-hook=save-button]': 'onClickSaveButton'
  },
  onClickSaveButton: function (event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.dropzone && this.dropzone.files.length > 0) {
      this.dropzone.processQueue()
    } else {
      debug('no file selected. button should be disabled')
    }
  },
  render: function () {
    this.renderWithTemplate(this)

    // when Dropzone is instantiated dz autorender itself into the container element
    var container = this.queryByHook('dropzone')
    var dropzone = new Dropzone(container, this._values)
    this.dropzone = dropzone

    this.setDzEvents(this.dzEvents)
  },
  updateDzEvents: function (dzEvents) {
    dzEvents || (dzEvents = this.dzEvents)
    this.unsetDzEvents()
    this.dzEvents = dzEvents
    this.setDzEvents(dzEvents)
    return dzEvents
  },
  unsetDzEvents: function () {
    for (var eventName in this.dzEvents) {
      this.dropzone.off(eventName, this.dzEvents[eventName])
    }
  },
  setDzEvents: function (dzEvents) {
    for (var eventName in dzEvents) {
      this.dropzone.on(eventName, dzEvents[eventName])
    }
  },
  save: function (options) {
    options || (options = {})
    if (options.dzEvents) {
      this.updateDzEvents(options.dzEvents)
    }

    if (this.dropzone.files.length === 0) {
      if (this.dzEvents.complete) {
        this.dzEvents.complete({})
      }
    } else {
      this.dropzone.processQueue()
    }
  },
  reset: function () {
    var dropzone = this.dropzone
    dropzone.files.forEach(function (file) {
      dropzone.removeFile(file)
    })
  }
})
