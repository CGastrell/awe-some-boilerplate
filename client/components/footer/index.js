const View = require('ampersand-view')

module.exports = View.extend({
  template: require('./footer.hbs'),
  render: function () {
    this.renderWithTemplate(this)
  }
})
