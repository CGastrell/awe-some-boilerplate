module.exports = {
  'isDev': false,
  /**
  "session": {
  "host": "localhost",
  "port": 6379,
  "db": 1,
  "secret": "bang!",
  "secure": false
},
*/
  'cookie': {
    httpOnly: false,
    maxAge: 60 * 1000 * 15,
    secret: '246bace2-38cb-4138-85d9-0ae8160b07c8',
    name: 'session'
    /*
    'encoding': 'none',
    'ttl': 60 * 1000 * 15,
    'isSecure': false
    "isHttpOnly": true,
    "clearInvalid": true, // remove invalid cookies
    "strictHeader": true // don't allow violations of RFC 6265
    */
  },
  'http': {
    'listen': 'localhost',
    'port': 8080
  },
  'client': {
    'apiUrl': 'http://api.url',
    'apiPaths': {
      'userRegistrationConfirm': '/api/users/confirm',
      'userLogout': '/api/users/logout',
      'resetPasswordRequest': '/api/users/reset',
      'resetPassword': '/reset-password'
    },
    'debugMode': false,
    'fb': {
      'appId': '222287578130862', // test app id
      'version': 'v2.5',
      'xfbml': true
    },
    'maxFilesize': 300
  }
}
