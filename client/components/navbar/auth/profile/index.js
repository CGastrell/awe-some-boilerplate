var app = require('ampersand-app')
var View = require('ampersand-view')
var templateHbs = require('./template.hbs')

module.exports = View.extend({
  initialize: function () {
    this.model = app.store.session.profile
  },
  template: templateHbs,
  bindings: {
    'model.fullname': {
      type: 'text',
      hook: 'fullname'
    },
    'model.download_avatar_url': {
      type: 'attribute',
      name: 'src',
      hook: 'avatar'
    }
  }
})
