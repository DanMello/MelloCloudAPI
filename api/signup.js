exports.signup = function (req, res, next) {

  let firstLetterUpperCase = function(string) {

    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  let newUser = {
    first_name: firstLetterUpperCase(req.body.firstName),
    last_name: firstLetterUpperCase(req.body.lastName),
    email: req.body.email.toLowerCase(),
    password: req.app.bcrypt.hashSync(req.body.password)
  }

  req.app.db('users')
    .insert(newUser)
    .then(ids => {

      let token = req.app.jwt.sign({
        id: ids[0]
      }, req.app.config.settings[req.app.config.enviroment].tokenSecret)

      return res.json({
        token,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email
      })

    }).catch(err => {

      return res.status(500).send(err.message)
    })
}