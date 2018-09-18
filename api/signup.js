exports.signup = function (req, res, next) {

  let newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email.toLowerCase(),
    password: req.app.bcrypt.hashSync(req.body.password)
  }

  req.app.db('users')
    .insert(newUser)
    .then(ids => {

      let token = req.app.jwt.sign({
        id: ids[0]
      }, req.app.config.settings[req.app.config.enviroment].tokenSecret)

      res.json({
        token,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      })

    }).catch(err => {

      res.json({
        error: true,
        message: "There was a problem creating your account, please try again in a few minutes"
      })
    })
}