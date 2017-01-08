var View = require('ampersand-view')
var FormView = require('ampersand-form-view')
var DropzoneView = require('../dropzone')
var ButtonView = require('components/formbutton')
var ProfileActions = require('actions/profile')

module.exports = View.extend({
  template: require('./template.hbs'),
  props: {
    type: ['string', true, 'square']
  },
  render: function () {
    var self = this
    this.renderWithTemplate(this)
    var form, button, dropzone

    dropzone = new DropzoneView({
      model: this.model,
      type: this.type,
      hideSaveButton: true
    })
    this.renderSubview(
      dropzone,
      this.queryByHook('dropzone-container')
    )

    button = new ButtonView({
      text: 'Save',
      class: 'btn btn-primary',
      onClick: function (event) {
        ProfileActions.uploadCover(self.model, dropzone)
      }
    })

    this.renderSubview(button, this.queryByHook('buttons-container'))

    form = new FormView({
      validCallback: function (valid) {
        if (!valid) {
          button.set('disabled', true)
        } else {
          button.set('disabled', false)
        }
      }
    })
    this.renderSubview(form, this.queryByHook('form-container'))
  }
})
