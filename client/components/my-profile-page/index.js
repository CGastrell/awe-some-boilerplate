var app = require('ampersand-app')
var View = require('ampersand-view')
var BannerView = require('components/profile-banner').SessionView
var Tabs = require('./tabs')

module.exports = View.extend({
  template: require('./template.hbs'),
  pageTitle: 'My Profile',
  autoRender: true,
  initialize: function () {
    this.state = app.state.myprofile.get({ sync: true })
  },
  render: function () {
    this.renderWithTemplate(this)

    this.renderSubview(
      new BannerView({
        model: this.state.profile,
        public: false
      }),
      this.queryByHook('banner-container')
    )

    this.renderSubview(
      new Tabs({ model: this.state.profile }),
      this.queryByHook('tabs-container')
    )
  }
})
