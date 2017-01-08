var app = require('ampersand-app')
var setFavicon = require('favicon-setter')
var View = require('ampersand-view')
var dom = require('ampersand-dom')
var ViewSwitcher = require('ampersand-view-switcher')
var _ = require('lodash')
var domify = require('domify')
var localLinks = require('local-links')

var bodyHbs = require('./templates/body.hbs')
var headHbs = require('./templates/head.hbs')
var NavbarView = require('../navbar')
const Footer = require('../footer')

module.exports = View.extend({
  template: bodyHbs,
  autoRender: true,
  initialize: function () {
    // window.aaa = this;
    this.title = 'SPA Boilerplate'
    // this marks the correct nav item selected
    this.listenTo(app, 'page.switch', this.onSwitchPage)
  },
  events: {
    'click a[href]': 'onClickLink',
    'click a.social-link.twitter-link': 'onClickTwitterLink',
    'click a.social-link.facebook-link': 'onClickFacebookLink'
  },
  subviews: {
    footer: {
      selector: 'footer',
      constructor: Footer
    },
    navbar: {
      selector: '[data-hook=navbar-container]',
      constructor: NavbarView
    }
  },
  render: function () {
    // some additional stuff we want to add to the document head
    document.head.appendChild(domify(headHbs(this)))

    // main renderer
    this.renderWithTemplate(this)

    // init and configure our page switcher
    this.pageSwitcher = new ViewSwitcher(
      this.queryByHook('page-container'), {
        show: function (newView, oldView) {
          document.title = _.result(newView, 'pageTitle') || 'Interactar'
          document.scrollTop = 0
          dom.addClass(newView.el, 'active')
          app.currentPage = newView
        }
      }
    )

    // setting a favicon for fun (note, it's dynamic)
    setFavicon('/favicon.ico')

    return this
  },
  onSwitchPage: function (view) {
    // tell the view switcher to render the new one
    this.pageSwitcher.set(view)

    // mark the correct nav item selected
    // this.updateActiveNav();
  },
  onClickLink: function (e) {
    e.preventDefault()
    var localPath = localLinks.pathname(e)
    if (localPath) {
      app.navigate(localPath)
    }
  },
  onClickTwitterLink: function (e) {
    var url = 'https://twitter.com/interactar'
    window.open(url, '_blank')
  },
  onClickFacebookLink: function (e) {
    var url = 'https://www.facebook.com/interactar'
    window.open(url, '_blank')
  },
  updateActiveNav: function () {
    var path = window.location.pathname.slice(1)

    this.queryAll('.nav a[href]').forEach(function (aTag) {
      var aPath = aTag.pathname.slice(1)

      if ((!aPath && !path) || (aPath && path.indexOf(aPath) === 0)) {
        dom.addClass(aTag.parentNode, 'active')
      } else {
        dom.removeClass(aTag.parentNode, 'active')
      }
    })
  }
})
