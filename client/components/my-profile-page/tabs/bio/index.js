var app = require('ampersand-app')
var View = require('ampersand-view')
var FormView = require('ampersand-form-view')
var ButtonView = require('components/formbutton')
var SelectView = require('ampersand-select-view')
var InputView = require('components/input-view')
var DatepickerInputView = require('components/input-view/datepicker')
var LanguagesSelectView = require('components/languages-select')
var ProfileActions = require('actions/profile')
var _ = require('lodash')

module.exports = View.extend({
  template: require('./form.hbs'),
  initialize: function (options) {
    this.profile = app.state.myprofile.get().profile
    this.languages = options.languages
  },
  render: function () {
    this.renderWithTemplate(this)

    var fieldset = new FieldsetView({
      model: this.profile,
      languages: this.languages
    })

    this.renderSubview(
      fieldset,
      this.queryByHook('fieldset-container')
    )

    this.savebtn = new ButtonView({
      text: 'Save',
      class: 'btn btn-primary',
      onClick: function () {
        var data = fieldset.data
        var date = new Date(data.date_birth_formatted)
        if (date !== 'Invalid Date') {
          data.date_birth = date.toISOString()
        }
        ProfileActions.updateProfile(data)
      }
    })

    this.renderSubview(
      this.savebtn,
      this.queryByHook('buttons-container')
    )

    var $ = require('jquery')
    $(this.query('[name~=small_description]')).attr('maxlength', 50)
  }
})

var SelectCustomView = SelectView.extend({
  template: [
    '<div>',
    '<label data-hook="label"></label>',
    '<select class="form-control"></select>',
    '<span data-hook="message-container" class="message message-below message-error">',
    '<p data-hook="message-text"></p>',
    '</span>',
    '</div>'
  ].join('\n'),
  props: {
    styles: ['string', false, 'amp-select']
  },
  bindings: _.extend({}, SelectView.prototype.bindings, {
    styles: {
      type: 'attribute',
      name: 'class'
    }
  })
})

var FieldsetView = FormView.extend({
  initialize: function (options) {
    var model = this.model
    var self = this
    this.languages = options.languages

    FormView.prototype.initialize.apply(this, arguments)

    this.listenTo(model, 'change:small_description', function () {
      self.setValue('small_description', model.small_description)
    })

    this.listenTo(model, 'change:biography', function () {
      self.setValue('biography', model.biography)
    })

    this.listenTo(model, 'change:fullname', function () {
      self.setValue('fullname', model.fullname)
    })

    this.listenTo(model, 'change:facebook_link', function () {
      self.setValue('facebook_link', model.facebook_link)
    })

    this.listenTo(model, 'change:twitter_link', function () {
      self.setValue('twitter_link', model.twitter_link)
    })

    this.listenTo(model, 'change:google_link', function () {
      self.setValue('google_link', model.google_link)
    })

    this.listenTo(model, 'change:email', function () {
      self.setValue('email', model.email)
    })

    this.listenTo(model, 'change:date_birth_formatted', function () {
      self.setValue('date_birth_formatted', model.date_birth_formatted)
    })

    this.listenTo(model, 'change:gender', function () {
      self.setValue('gender', model.gender)
    })

    this.listenTo(model.language, 'change', function () {
      self.setValue('language', model.language.id)
    })

    this.listenTo(model, 'change:country', function () {
      self.setValue('country', model.country)
    })
  },
  autoRender: true,
  fields: function () {
    return [
      new InputView({
        type: 'text',
        label: 'NAME',
        required: false,
        value: this.model.fullname,
        name: 'fullname',
        styles: 'col-xs-12'
      }),
      new InputView({
        label: 'SHORT DESCRIPTION',
        type: 'text',
        required: false,
        maxLength: 50,
        value: this.model.small_description,
        name: 'small_description',
        placeholder: 'Enter short description',
        styles: 'col-xs-12'
      }),
      new InputView({
        template: `
          <div class="">
            <label data-hook="label"></label>
            <textarea class="form-input form-control"></textarea>
            <div data-hook="message-container"
              class="message message-below message-error">
              <p data-hook="message-text"></p>
            </div>
          </div>`,
        label: 'BIOGRAPHY',
        type: 'textarea',
        required: false,
        value: this.model.biography,
        name: 'biography',
        placeholder: 'Enter Biography',
        styles: 'col-xs-12'
      }),
      new InputView({
        type: 'text',
        label: 'EMAIL',
        required: false,
        name: 'email',
        value: this.model.email,
        styles: 'col-xs-12 col-md-3'
      }),
      new DatepickerInputView({
        type: 'date',
        label: 'DATE OF BIRTH',
        required: false,
        name: 'date_birth_formatted',
        value: this.model.date_birth_formatted,
        styles: 'col-xs-12 col-md-3'
      }),
      new SelectCustomView({
        label: 'GENDER',
        name: 'gender',
        options: ['Male', 'Female', 'Other'],
        unselectedText: 'Please choose one',
        required: false,
        tabindex: 1,
        value: this.model.gender,
        styles: 'col-xs-12 col-md-3 amp-select'
      }),
      new InputView({
        type: 'text',
        label: 'COUNTRY',
        required: false,
        name: 'country',
        value: this.model.country,
        styles: 'col-xs-12 col-md-3'
      }),
      new LanguagesSelectView({
        options: this.languages,
        unselectedText: 'Please choose a Language',
        tabindex: 2,
        required: false,
        styles: 'col-xs-12 amp-select',
        value: this.model.language_id
      }),
      new InputView({
        type: 'text',
        label: 'WEBSITE',
        required: false,
        value: this.model.website,
        name: 'website',
        styles: 'col-xs-12 col-md-6'
      }),
      new InputView({
        type: 'text',
        label: 'SKYPE ID',
        required: false,
        value: this.model.skype_id,
        name: 'skype_id',
        styles: 'col-xs-12 col-md-6'
      }),
      new InputView({
        type: 'text',
        label: 'FACEBOOK',
        required: false,
        value: this.model.facebook_link,
        name: 'facebook_link',
        styles: 'col-xs-12 col-md-6'
      }),
      new InputView({
        type: 'text',
        label: 'AUDIO EQUIPMENT',
        required: false,
        value: this.model.audio_equipment,
        name: 'audio_equipment',
        styles: 'col-xs-12 col-md-6'
      }),
      new InputView({
        type: 'text',
        label: 'TWITTER',
        required: false,
        value: this.model.twitter_link,
        name: 'twitter_link',
        styles: 'col-xs-12'
      }),
      new InputView({
        type: 'text',
        label: 'GOOGLE PLUS',
        required: false,
        value: this.model.google_link,
        name: 'google_link',
        styles: 'col-xs-12'
      })
    ]
  }
})
