const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection

exports.init = function (req, res, next) {

  let token = req.body.token || req.params.token
  
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {

    db('users')
      .where('id', decoded.id)
      .first()
      .then(user => {

        if (!user) return res.status(400).send('Invalid user token, please log back in.')

        res.json({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          isVerified: user.isVerified,
          developer: user.developer,
          token: token
        })

      }).catch(err => {

        next(err)
      })
  })
}