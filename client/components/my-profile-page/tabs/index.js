var app = require('ampersand-app')
var View = require('ampersand-view')
var TabBio = require('./bio')

module.exports = View.extend({
  template: require('./template.hbs'),
  render: function () {
    this.renderWithTemplate(this)
    var self = this
    var languages = app.state.languages.getLanguages({
      success: function () {
        self.renderSubview(
          new TabBio({languages: languages}),
          self.queryByHook('bio-form-container')
        )
      }
    })
  }
})
