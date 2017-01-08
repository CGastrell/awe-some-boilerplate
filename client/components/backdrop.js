var $ = require('jquery')

function Backdrop (options) {
  this.visible = false

  this.onclick = options.onclick || function () {}
}

Backdrop.prototype.show = function () {
  this.$elem = $('<div class="modal-backdrop fade in"></div>')
  this.$elem.appendTo(document.body)

  var self = this
  this.$elem.on('click', function () {
    self.onclick()
  })
  this.visible = true
}

Backdrop.prototype.hide = function () {
  if (this.$elem) this.$elem.remove()
  this.visible = false
}

Backdrop.prototype.remove = function () {
  this.hide()
}

Backdrop.prototype.toggle = function () {
  if (this.visible) {
    this.hide()
  } else {
    this.show()
  }
}

module.exports = Backdrop
