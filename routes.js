
exports = module.exports = function(app) {

  //api post routes
  app.post('/account/login', require('./api/login').login)
  app.post('/account/signup', require('./api/signup').signup)
  app.post('/account/signup/emailCheck', require('./api/emailcheck').checkEmail)
  app.post('/account/getProfile', require('./api/profile').getProfile)

  app.get('/users', function (req, res) {

    console.log('request received')

    req.app.db('users')
      .where('email', 'jdanmello@gmail.com')
      .first()
      .then(user => {

        res.json(user)
      })
  })
}