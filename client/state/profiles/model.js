var BaseModel = require('../base-model')
var config = require('clientconfig')
var moment = require('moment')
var Languages = require('state/languages')

var Schema = BaseModel.extend({
  props: {
    id: 'string',
    fullname: 'string',
    email: 'string',
    avatar: ['string', false, ''],
    cover: ['string', false, ''],
    avatar_local_filename: ['string', false, ''],
    timezone: 'string',
    locale: 'string',
    rating: ['number', false, 0],
    small_description: 'string',
    biography: 'string',
    gender: 'string',
    country: 'string',
    date_birth: 'date',
    audio_equipment: 'string',
    website: 'string',
    skype_id: 'string',
    language_id: ['string'],
    facebook_link: 'string',
    google_link: 'string',
    twitter_link: 'string',
    date_updated: 'date',
    onboarding: 'boolean',
    period_score: ['number', false, 0],
    total_score: ['number', false, 0],
    total_ranking: ['number', false, 0],
    period_ranking: ['number', false, 0],
    notifications_to_mail: ['boolean', false, true]
  },
  urlRoot: config.apiUrl + '/api/Profiles'
})

module.exports = Schema.extend({
  children: {
    language: Languages.Model
  },
  derived: {
    profileUrl: {
      deps: ['id'],
      fn: function () {
        return '/profile/' + this.id
      }
    },
    date_birth_formatted: {
      deps: ['date_birth'],
      fn: function () {
        if (!this.date_birth) return
        var date = new Date(this.date_birth).toISOString()
        return moment.utc(date).format('YYYY-MM-DD')
      }
    },
    upload_avatar_url: {
      deps: ['id'],
      fn: function () {
        return this.urlRoot + '/' + this.id + '/uploadAvatar'
      }
    },
    download_avatar_url: {
      deps: ['avatar', 'avatar_local_filename', 'date_updated'],
      fn: function () {
        if (this.avatar) {
          return this.avatar
        } else if (this.avatar_local_filename) {
          return [
            this.urlRoot,
            this.id,
            'downloadAvatar'
          ].join('/') + '?date=' + moment(this.date_updated).format('x')
        } else {
          return '/images/profile.png'
        }
      }
    },
    upload_cover_url: {
      deps: ['id'],
      fn: function () {
        return this.urlRoot + '/' + this.id + '/uploadCover'
      }
    },
    download_cover_url: {
      deps: ['cover', 'date_updated'],
      fn: function () {
        if (this.cover) {
          return [
            this.urlRoot,
            this.id,
            'downloadCover'
          ].join('/') + '?date=' + moment(this.date_updated).format('x')
        } else {
          return '/images/profile-banner.jpg'
        }
      }
    }
  }
})
