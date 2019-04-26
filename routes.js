
exports = module.exports = function (app) {

  app.post('/account/contact', require('./routes/contactMe').init)

  //api for react-smart-forms
  app.post('/account/checkemail', require('./routes/checkemail').init)
  app.post('/thankyou', require('./routes/responseRSF').init)

  // server side rendering routes used to dynamically update meta tags for description and title based on url. 
  app.get('/', require('./routes/ssr').home) 
  app.get('/notes', require('./routes/ssr').notes)
  app.get('/resume', require('./routes/ssr').resume)
  app.get('/contact', require('./routes/ssr').contact)
  app.get('/react-simpler-forms', require('./routes/ssr').reactSimplerForms)
  app.get('/react-video-player', require('./routes/ssr').reactVideoPlayer)
  app.get('*', require('./routes/ssr').init)
}