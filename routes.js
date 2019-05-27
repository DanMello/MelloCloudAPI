exports = module.exports = function (app) {

  app.post('/account/contact', require('./apiroutes/contactMe').init)

  //api for react-smart-forms
  app.post('/account/checkemail', require('./apiroutes/checkemail').init)
  app.post('/thankyou', require('./apiroutes/responseRSF').init)

  // server side rendering routes used to dynamically update meta tags for description and title based on url. 
  app.get('/', require('./apiroutes/ssr').home) 
  app.get('/notes', require('./apiroutes/ssr').notes)
  app.get('/resume', require('./apiroutes/ssr').resume)
  app.get('/contact', require('./apiroutes/ssr').contact)
  app.get('/react-simpler-forms', require('./apiroutes/ssr').reactSimplerForms)
  app.get('/react-video-player', require('./apiroutes/ssr').reactVideoPlayer)
  app.get('/tic-tac-chat', require('./apiroutes/ssr').tictactoe)
  app.get('*', require('./apiroutes/ssr').init)
};