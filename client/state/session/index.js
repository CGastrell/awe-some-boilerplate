var Profile = require('../profiles').Model
var localforage = require('localforage')
var debug = require('debug')('store:session')
var State = require('ampersand-state')

exports.State = State.extend({
  props: {
    last_access: ['number', false, null],
    access_token: ['string', false, null],
    profile_id: 'string',
    user_id: 'string'
  },
  children: {
    profile: Profile
  },
  session: {
    storage: 'object'
  },
  derived: {
    active: {
      deps: ['access_token'],
      fn: function () {
        return this.access_token !== null
      }
    }
  },
  serialize: function () {
    return {
      last_access: this.last_access,
      access_token: this.access_token,
      profile_id: this.profile_id,
      user_id: this.user_id
    }
  },
  initialize: function (options) {
    // model instances must exists before the view
    // components. that way the views are renderer
    // with the models and can listen to the models
    // change events
    this.profile = new Profile()

    this.storage = localforage.createInstance({
      name: 'interactar',
      storeName: 'session'
    })

    var self = this
    this.storage
    .getItem('session')
    .then(function (value) {
      // change when storage has been fetched
      // this triggers once the profile
      if (value !== null) self.create(value)
      else self.last_access = Date.now()
    })
  },
  create: function (data) {
    var self = this
    this.profile.set('id', data.profile_id)
    this.profile.fetch({
      success: function (model, response, options) {
        self.set(data)
        self.initializeSession(data)
      }
    })
  },
  initializeSession: function (data) {
    this.last_access = Date.now()
    this.storage
      .setItem('session', this.serialize())
      .catch(function (err) {
        debug('ERROR %j', err)
      })
  },
  destroy: function (done) {
    done = done || function () {}
    this.profile.clear()
    this.storage.clear()
    this.clear()
    return done()
  }
})
