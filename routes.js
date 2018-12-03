
exports = module.exports = function(app) {

  //api post routes
  app.post('/account/login', require('./apiroutes/login').init)
  app.post('/account/signup', require('./apiroutes/signup').init)
  app.post('/account/signup/emailCheck', require('./apiroutes/checkIfEmailExists').init)
  app.post('/account/contact', require('./apiroutes/contactMe').init)
  app.post('/account/forgot', require('./apiroutes/createPasswordResetToken').init)
  app.post('/account/reset', require('./apiroutes/resetPassword').init)
  app.post('/account/update', require('./apiroutes/update').init)
  app.post('/account/getprofile', require('./apiroutes/profile').init)
  app.post('/account/resendemailtoken', require('./apiroutes/resendVerificationToken').init)

  app.get('/account/verification/:token', require('./apiroutes/checkVerificationToken').init)
}