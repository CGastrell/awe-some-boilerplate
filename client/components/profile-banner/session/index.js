var View = require('ampersand-view')
var Modalizer = require('components/modalizer')
var UploadCoverView = require('./upload-cover-form')

require('bootstrap')

module.exports = View.extend({
  template: require('./template.hbs'),
  autoRender: true,
  props: {
    public: 'boolean'
  },
  bindings: {
    public: [
      {type: 'toggle', hook: 'follow-invite'},
      {type: 'toggle', hook: 'social-icons'},
      {type: 'toggle', hook: 'edit-profile-cover', invert: true},
      {type: 'toggle', hook: 'edit-profile-avatar', invert: true}
    ],
    'model.fullname': {type: 'text', hook: 'name'},
    'model.small_description': {type: 'text', hook: 'small_description'},
    'model.download_avatar_url': {type: 'attribute', hook: 'profile-avatar-image', name: 'src'},
    'model.download_cover_url': {type: 'attribute', hook: 'profile-cover-image', name: 'src'}
  },
  events: {
    'click [data-hook=share-google]': 'onClickGPlus',
    'click [data-hook=share-facebook]': 'onClickFacebook',
    'click [data-hook=share-twitter]': 'onClickTwitter',
    'click [data-hook=edit-profile-avatar]': 'onClickUploadProfileAvatar',
    'click [data-hook=edit-profile-cover]': 'onClickUploadCoverPicture'
  },
  render: function () {
    this.renderWithTemplate(this)

    // Avatar upload form & modal
    var formAvatar = new UploadCoverView({
      model: this.model,
      type: 'avatar'
    })
    formAvatar.render()

    this.modalAvatar = new Modalizer({
      'title': 'Upload Avatar',
      'bodyView': formAvatar,
      'class': '',
      'buttons': false
    })

    // Banner upload form & modal
    var formBanner = new UploadCoverView({
      model: this.model,
      type: 'banner'
    })
    formBanner.render()

    this.modalCover = new Modalizer({
      'title': 'Upload Banner',
      'bodyView': formBanner,
      'class': '',
      'buttons': false
    })
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
  },
  onClickUploadProfileAvatar: function (event) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.model.avatar) {
      if (this.modalAvatar.visible) this.modalAvatar.hide()
      this.modalAvatar.show()
    }
  },
  onClickUploadCoverPicture: function (event) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.model.banner) {
      if (this.modalCover.visible) this.modalCover.hide()
      this.modalCover.show()
    }
  }
})
