var View = require('ampersand-view')

module.exports = View.extend({
  template: require('./template.hbs'),
  autoRender: true,
  props: {
    public: 'boolean'
  },
  bindings: {
    'model.fullname': {type: 'text', hook: 'name'},
    'model.small_description': {type: 'text', hook: 'small_description'},
    'model.download_avatar_url': {type: 'attribute', hook: 'profile-avatar-image', name: 'src'},
    'model.download_cover_url': {type: 'attribute', hook: 'profile-cover-image', name: 'src'}
  },
  events: {
    'click [data-hook=share-google]': 'onClickGPlus',
    'click [data-hook=share-facebook]': 'onClickFacebook',
    'click [data-hook=share-twitter]': 'onClickTwitter'
  },
  render: function () {
    this.renderWithTemplate(this)
  },
  onClickGPlus: function (event) {
    event.preventDefault()
    event.stopPropagation()
    window.open(this.model.google_link, '_blank')
  },
  onClickFacebook: function (event) {
    event.preventDefault()
    event.stopPropagation()
    window.open(this.model.facebook_link, '_blank')
  },
  onClickTwitter: function (event) {
    event.preventDefault()
    event.stopPropagation()
    window.open(this.model.twitter_link, '_blank')
  }
})
