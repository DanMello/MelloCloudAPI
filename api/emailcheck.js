exports.checkEmail = function (req, res, next) {

  console.log(req.body)

  let email = req.body.email.toLowerCase()

  req.app.db('users')
    .where('email', email)
    .first()
    .then(user => {

      if (user) {
        
        return res.status(400).send('That email is already being used.')

      } else {

      	return res.send('That email is available!')
      }

    }).catch(err => {

      return res.status(500).send(err.message)
    })
}