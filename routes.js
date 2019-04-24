
exports = module.exports = function(app) {

  //api post routes no longer being used ill just leave them here for now
  // app.post('/account/login', require('./apiroutes/login').init)
  // app.post('/account/signup', require('./apiroutes/signup').init)
  // app.post('/account/signup/emailCheck', require('./apiroutes/checkIfEmailExists').init)
  // app.post('/account/forgot', require('./apiroutes/createPasswordResetToken').init)
  // app.post('/account/reset', require('./apiroutes/resetPassword').init)
  // app.post('/account/update', require('./apiroutes/update').init)
  // app.post('/account/getprofile', require('./apiroutes/profile').init)
  // app.post('/account/deleteaccount', require('./apiroutes/deleteAccount').init)
  // app.post('/account/resendemailtoken', require('./apiroutes/resendVerificationToken').init)
  // app.post('/account/getprojects', require('./apiroutes/getVideoProjects').init)
  // app.post('/account/getvideos', require('./apiroutes/getVideos').init)

  // app.get('/account/getprofile/:token', require('./apiroutes/profile').init)
  // app.get('/account/verification/:token', require('./apiroutes/checkVerificationToken').init)
  // app.post('/signup', require('./redux-smart-forms/signup').init)
  
  app.post('/account/contact', require('./apiroutes/contactMe').init)
  
  //api for redux-smart-forms
  app.post('/account/checkemail', require('./redux-smart-forms/checkemail').init)
  app.post('/thankyou', require('./redux-smart-forms/thankyou').init)

  // server side rendering routes
  app.get('/', require('./ssrRoutes/index').home)
  app.get('/notes', require('./ssrRoutes/index').notes)
  app.get('*', require('./ssrRoutes/index').init)
}