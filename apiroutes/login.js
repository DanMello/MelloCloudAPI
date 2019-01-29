const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection

exports.init = function (req, res, next) {

  db('users')
    .where('email', req.body.email)
    .first()
    .then(user => {

      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {

        return res.status(400).send('Invalid email and password combination.')
      
      } else {

        const token = jwt.sign({
          id: user.id
        }, process.env.TOKEN_SECRET)

        return res.json({
          token,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          isVerified: user.isVerified,
          developer: user.developer
        })
      }

    }).catch(err => {
      
      return res.status(500).send(err.message)
    })
}