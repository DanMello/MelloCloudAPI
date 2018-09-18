exports.login = function (req, res, next) {

  req.app.db('users')
    .where('email', req.body.email)
    .first()
    .then(user => {

      if (!user || !req.app.bcrypt.compareSync(req.body.password, user.password)) {
      
        res.json({error: true, message: 'Invalid email and password combination'})
      
      } else {

        let token = req.app.jwt.sign({
          id: user.id
        }, req.app.config.settings[req.app.config.enviroment].tokenSecret)

        res.json({
          token,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        })
      }

    }).catch(err => {

      console.log(err)

      res.json({
        error: true,
        message: "There was a problem logging into your account, please try again in a few minutes"
      })
    })
}