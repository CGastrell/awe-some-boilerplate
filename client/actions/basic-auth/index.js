var app = require('ampersand-app')
var XHR = require('libs/xhr')
var config = require('clientconfig')
var client = require('./client')
var NavbarActions = require('actions/navbar')
var Profiles = require('state/profiles')

function registrationConfirmSuccess (response) {
  //
  // NOTE: this should be a HANDLER/REDUCER in the STORE triggered by an ACTION
  //
  // var alertMsg = app.store.navbar.signInAlert;
  // alertMsg.set('enabled' , true);
  // alertMsg.set('message' , );
  // alertMsg.set('type'    , );

  app.alerts.set('alerts', {
    type: 'alert alert-success',
    message: 'Your account is ready. Please login',
    title: 'Well done!'
  })

  //
  // this should be another HANDLER in the STORE with a navigate ACTION
  //
  app.navigate('landing/login')
}

function registrationConfirmFailed (response) {
  app.navigate('')
}

module.exports = {
  login: function (options) {
    var email = options.email
    var password = options.password

    app.startLoading()

    client.login({
      username: email,
      password: password,
      error: function (error, xhr) {
      },
      success: function (response, xhr) {
        var user_id = response.userId
        var profile = (new Profiles.State()).fetchProfile({
          where: { user_id: user_id }
        }, {
          success: function () {
            app.store.session.create({
              'access_token': response.id,
              'user_id': user_id,
              'profile_id': profile.id
            })

            app.finishLoading()

            if (profile.onboarding === true) {
              profile.onboarding = false
              profile.save()
              app.navigate('/welcome')
            } else {
              app.navigate('/home')
            }
          },
          error: function () {
          }
        })
      }
    })
  },
  register: function (options) {
    var email = options.email
    var password = options.password
    var terms = options.terms

    app.startLoading()
    app.store.registration.start()

    client.register({
      'username': email,
      'email': email,
      'password': password,
      'provider': 'local',
      'terms': terms,
      'success': function (data, xhr) {
        app.finishLoading()
        app.store.registration.finish()
        app.navigate('/registration/success')
      },
      'error': function (error, xhr) {
        app.finishLoading()
        app.store.registration.failed()
        app.alerts.handleServerError(xhr)
      }
    })
  },
  confirmRegistration: function (request) {
    var self = this
    var token = request.token
    var uid = request.uid
    var url = [
      config.apiUrl,
      config.apiPaths.userRegistrationConfirm,
      '?uid=' + uid,
      '&token=' + token
    ].join('')

    XHR({
      'method': 'GET',
      'url': url,
      'withCredentials': true,
      'done': function (data, xhr) {
        registrationConfirmSuccess({
          'data': data,
          'xhr': xhr
        })
      },
      'fail': function (error, xhr) {
        registrationConfirmFailed({
          'error': error,
          'xhr': xhr
        })
      },
      'timeout': 5000
    })
  },
  resetPasswordRequest: function (email) {
    var self = this
    var url = [
      config.apiUrl,
      config.apiPaths.resetPasswordRequest
    ].join('')

    XHR({
      'method': 'POST',
      'url': url,
      'jsonData': {email: email},
      'done': function (data, xhr) {},
      'fail': function (error, xhr) {},
      'timeout': 5000
    })
  },
  resetPassword: function (params) {
    var self = this
    var url = [
      config.apiUrl,
      config.apiPaths.resetPassword,
      '?access_token=' + location.search.split('access_token=')[1]
    ].join('')

    XHR({
      'method': 'POST',
      'url': url,
      'jsonData': params,
      'done': function (data, xhr) {
        app.alerts.success('Passwords successfully changed')
        NavbarActions.startLogin()
      },
      'fail': function (error, xhr) {
        app.alerts.danger('Error changing password, please try again')
      },
      'timeout': 5000
    })
  }
}
