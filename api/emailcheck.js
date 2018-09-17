exports.checkEmail = function (req, res, next) {

  let email = req.body.email.toLowerCase()

  req.app.db('users')
    .where('email', email)
    .first()
    .then(user => {

      if (user) 
      	return res.json({
          error: true, 
          message: 'That email is already being used'
        })
      else 
      	return res.json({
          error: false
        })

    }).catch(err => {

      console.log(err)

      res.json({
        error: true, 
        message: 'Something went wrong trying to check your email, please try again'
      })
    })
}