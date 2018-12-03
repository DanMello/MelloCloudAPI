const bcrypt = require('bcrypt-nodejs')
const db = require('../helpers/database').connection
const nodemailer = require('../helpers/nodemailer').nodemailer
const url = require('../helpers/url').init
const jwt = require('jsonwebtoken')
const sendVerificationEmail = require('../helpers/sendVerificationEmail').init

exports.init = function (req, res, next) {

  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function (err, decoded) {

    db('users')
      .where('id', decoded.id)
      .first()
      .then(user => {

        if (!user) {

          throw {
            message: 'Invalid user id, please sign out and log back in.',
            status: 400
          }
        }

        return sendVerificationEmail(req, user.id, user.email, false)

      }).then(() => {

        res.send('We sent you another verification email.')

      }).catch(err => {

        next(err)
      })
  })
}