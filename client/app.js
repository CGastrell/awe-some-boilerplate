require('jquery')
require('bootstrap')
require('app/block-ui')
require('./stylesheets')

var app = require('ampersand-app')
// var _ = require('lodash')
var config = require('clientconfig')
// var domReady = require('domready')
var Router = require('./router')
var Store = require('./store')
var State = require('./state')
var LayoutView = require('components/layout')
var Alerts = require('components/alerts')

window.__LOAD_FB_SDK = config.fb

window.app = app

// Extends our main app singleton
app.extend({
  alerts: new Alerts(),
  state: new State(),
  store: new Store(),
  router: new Router(),
  init: function () {
    // Create and attach our layout view
    this.store.initialize(this.state)
    this.layoutView = new LayoutView({el: document.getElementById('root')})

    // if login
    if (/login/.test(window.location.pathname) === true) {
      // this.initializeRouter();
      app.router.history.start({ pushState: true })
    } else {
      // once session state was completely initialized, start the app
      var session = this.state.session
      session.once('change:last_access', this.initializeRouter, this)
    }
  },
  initializeRouter: function () {
    console.log('init router')
    app.session = app.store.session
    app.router.history.start({ pushState: true })
  },
  navigate: function (page) {
    var url = (page.charAt(0) === '/') ? page.slice(1) : page
    if (window.location.pathname.slice(1) === url) {
      return
    }

    this.router.history.navigate(url, {
      trigger: true
    })
  }
})

app.init()
// domReady(_.bind(app.init, app))
