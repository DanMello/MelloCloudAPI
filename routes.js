
exports = module.exports = function(app) {

  //api post routes
  app.post('/account/login', require('./api/login').login)
  app.post('/account/signup', require('./api/signup').signup)
  app.post('/account/signup/emailCheck', require('./api/emailcheck').checkEmail)
  app.post('/account/contact', require('./api/contact').message)
}