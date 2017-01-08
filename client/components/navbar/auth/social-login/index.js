var View = require('ampersand-view')
var template_hbs = require('./template.hbs')
var SocialLoginActions = require('actions/social-auth')

module.exports = View.extend({
  props: {
    registered: 'boolean'
  },
  bindings: {
    registered: {
      hook: 'already-registered',
      type: 'toggle'
    }
  },
  template: template_hbs,
  events: {
    'click button.login.google': 'onClickGoogleLoginButton',
    'click button.login.facebook': 'onClickFacebookLoginButton',
    'click button.login.twitter': 'onClickTwitterLoginButton'
  },
  onClickGoogleLoginButton: function (event) {
    SocialLoginActions.login('google')
  },
  onClickFacebookLoginButton: function (event) {
    SocialLoginActions.login('facebook')
  },
  onClickTwitterLoginButton: function (event) {
    SocialLoginActions.login('twitter')
  }
})
