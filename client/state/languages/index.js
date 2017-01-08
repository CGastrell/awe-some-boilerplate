var Languages = require('./collection')
exports.Collection = Languages

var Category = require('./model')
exports.Model = Category

var BaseState = require('../base-state')

var State = BaseState.extend({
  getLanguages: function (options) {
    options || (options = {})
    var data = {}

    var languages = new Languages()
    this.fetch(languages, data, options)
    return languages
  }
})

exports.State = State
