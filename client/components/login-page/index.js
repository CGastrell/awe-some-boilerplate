var PageView = require('../base-page')
var template_hbs = require('./template.hbs')

module.exports = PageView.extend({
  template: template_hbs,
  pageTitle: 'Login',
  autoRender: true
})
