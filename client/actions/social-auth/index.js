
var providers = {
  'facebook': require('./facebook'),
  'twitter': require('./twitter'),
  'google': require('./google')
}

module.exports = {
  login: function (provider, options) {
    options = options || {}
    providers[provider].login(options)
  },
  /**
   * this is the social login callback, which reseives
   * the authentication code.
   * it is validated and registered in the api
   */
  authenticate: function (options) {
    switch (options.provider) {
      case 'google':
      case 'facebook':
        providers[options.provider].authenticate(options.code)
        break
    }
  }
}
