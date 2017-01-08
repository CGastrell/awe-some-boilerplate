module.exports = function (env) {
  console.log('environment is "%s"', env)
  if (!env) return 'index.handlebars'

  let file

  switch (env) {
    case 'demo':
    case 'production':
    case 'staging':
      file = 'index.' + env + '.handlebars'
      break
    default:
      file = 'index.handlebars'
      break
  }
  return file
}
