const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection
const FLUP = require('../helpers/stringfunctions').firstLetterUpperCase

exports.init = function (req, res, next) {

  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function (err, decoded) {

    db('users')
      .where('id', decoded.id)
      .first()
      .then(user => {

        if (!user) {

          throw {
            message: 'Invalid user token, please log back in.',
            status: 400
          }
        }

        let property

        if (req.body.property === 'password') {

          property = {
            password: bcrypt.hashSync(req.body.password)
          }

        } else {

          property = {
            [req.body.property]: req.body[req.body.property]
          }
        }

        return db('users')
          .where('id', user.id)
          .update(property)

      }).then(result => {

        if (!result) {

          throw {
            message: 'Something went wrong trying to change your password. Maybe try again?',
            status: 400
          }
        }

        res.send(`${FLUP(req.body.heading)} has been updated successfully.`)

      }).catch(err => {

        next(err)
      })
  })
}