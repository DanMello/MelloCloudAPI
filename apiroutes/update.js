const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection
const FLUP = require('../helpers/stringfunctions').firstLetterUpperCase
const sendVerificationEmail = require('../helpers/sendVerificationEmail').init

exports.init = function (req, res, next) {

  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function (err, decoded) {

    let id

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

        id = user.id

        if (req.body.property === 'password') {

          property = {
            password: bcrypt.hashSync(req.body.password)
          }

        } else if (req.body.property === 'email') {

          property = {
            email: req.body.email,
            isVerified: 0
          }

        } else {

          property = {
            [req.body.property]: req.body[req.body.property]
          }
        }

        return db('users')
          .where('id', id)
          .update(property)

      }).then(result => {

        if (!result) {

          throw {
            message: 'Something went wrong trying to change your password. Maybe try again?',
            status: 400
          }
        }

        if (req.body.property === 'email') {

          return sendVerificationEmail(req, id, req.body.email, true)
        }

        return

      }).then(() => {

        res.send(`${FLUP(req.body.heading)} has been updated successfully.`)

      }).catch(err => {

        console.log(err.message)

        next(err)
      })
  })
}