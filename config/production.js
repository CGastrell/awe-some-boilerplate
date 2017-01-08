module.exports = {
  'isDev': false,
  'http': {
    'listen': '0.0.0.0',
    'port': 8080
  },
  'cookie': {
    httpOnly: false,
    maxAge: 60 * 1000 * 15,
    secret: '246bace2-38cb-4138-85d9-0ae8160b07c8',
    name: 'session'
  },
  'client': {
    'apiUrl': 'http://localhost:3000',
    'apiPaths': {
      'userRegistrationConfirm': '/api/users/confirm'
    },
    'debugMode': false,
    'fb': {
      'appId': '222287428130877', // test app id
      'version': 'v2.5',
      'xfbml': true
    },
    'maxFilesize': 300
  },
  'environment': 'production'
}
