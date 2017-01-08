// var debug = require('debug')('app:action:profile');
var app = require('ampersand-app')
var XHR = require('libs/xhr')
var config = require('clientconfig')

module.exports = {
  updateProfile: function (data) {
    var profile = app.state.myprofile.get().profile
    // var profiletopics = app.state.myprofile.get().profiletopics;

    // var session = app.store.session;
    profile.set(data)

    if (data.language) {
      profile.language = data.language
      profile.language_id = data.language.id
    }
    profile.save({}, {
      success: function () {
        app.alerts.success('Profile Updates.', 'Changes saved.')
      },
      error: function () {
        app.alerts.danger('Profile Updates.', 'An error has occured.')
      }
    })
  },
  uploadCover: function (model, filehandler) {
    if (filehandler && filehandler.save) {
      filehandler.save({ dzEvents: {
        success: function (file, res, req) {
          model.date_updated = res.response.date_updated
          model.cover = res.response.cover
          model.avatar_local_filename = res.response.avatar_local_filename
        },
        error: function (err) {
          app.alerts.danger(
            'Profile Update Error.',
            'An error has occured.'
          )
        }
      }})
    }
  },
  deleteAccount: function () {
    var url = config.apiUrl + '/api/profiles/deleteAccount'
    return XHR({
      timeout: 5000,
      method: 'POST',
      url: url,
      headers: {},
      done: function () {
        app.session.destroy()
        app.navigate('/')
      },
      fail: function () {
        app.alert.danger('The account cannot be deleted right now, please try again later.')
      }
    })
  }
}
