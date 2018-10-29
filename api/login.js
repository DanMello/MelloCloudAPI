exports.login = function (req, res, next) {

  console.log('login', req.body)

  req.app.db('users')
    .where('email', req.body.email)
    .first()
    .then(user => {

      if (!user || !req.app.bcrypt.compareSync(req.body.password, user.password)) {

        return res.status(400).send('Invalid email and password combination.')
      
      } else {

        let token = req.app.jwt.sign({
          id: user.id
        }, req.app.config.settings[req.app.config.enviroment].tokenSecret)

        return res.json({
          token,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        })
      }

    }).catch(err => {

      console.log(err)

      return res.status(500).send(err.message)
    })
}