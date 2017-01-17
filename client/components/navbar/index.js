const View = require('ampersand-view')
const templateHbs = require('./navbar.hbs')

var AuthView = require('./auth')

module.exports = View.extend({
  template: templateHbs,
  subviews: { // append each subview to the items container
    user: {
      selector: '[data-hook=items-container]',
      constructor: AuthView
    }
  },
  render: function () {
    this.renderWithTemplate(this)

    // $(window).scroll(function () {
    //   var scroll = $(window).scrollTop()
    //   if (scroll >= 100) {
    //     $('.navbar-default').addClass('sticky')
    //     $('.navbar-default').removeClass('topScroll')
    //   } else {
    //     $('.navbar-default').removeClass('sticky')
    //     $('.navbar-default').addClass('topScroll')
    //   }
    // })
  }
})
