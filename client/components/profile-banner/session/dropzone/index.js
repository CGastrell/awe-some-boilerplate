var DropzoneView = require('components/dropzone')
var config = require('clientconfig')

module.exports = DropzoneView.extend({
  template: require('./template.hbs'),

  initialize: function (options) {
    DropzoneView.prototype.initialize
      .apply(this, arguments)

    options || (options = {})

    var self = this
    this.maxFilesize = config.maxFilesize
    this.url = function () {
      if (self.type == 'avatar') {
        return self.model.upload_avatar_url
      }
      if (self.type == 'banner') {
        return self.model.upload_cover_url
      }
    }

    this.autoProcessQueue = false
    this.hideSaveButton = options.hideSaveButton || false
  }
})
