const bcrypt = require('bcrypt-nodejs')
const db = require('../helpers/database').connection
const nodemailer = require('../helpers/nodemailer').nodemailer
const url = require('../helpers/url').init

exports.init = function (req, res, next) {

  let user = {}

  db('tokens')
    .where({
      token: req.params.token,
      type: 'verificationEmail'
    })
    .first()
    .then(token => {

      if (!token) {

        throw {
          message: 'Invalid email verification token',
          status: 400
        }
      }

      if (token.expires < Date.now()) {

        return db('tokens').where({token: req.params.token, type: 'verificationEmail'}).del()
      }

      user.id = token.userid

      return

    }).then(result => {

      if (result) {

        throw {
          message: 'Email verification token has expired',
          status: 400
        }
      }

      return db('users')
        .where({
          id: user.id
        })
        .first()
        .update({
          isVerified: 1
        })

    }).then(result => {

      if (!result) {

        throw {
          message: 'There was a problem trying to verify your email token',
          status: 400
        }
      }

      return db('tokens').where({token: req.params.token, type: 'verificationEmail'}).del()

    }).then(result => {

      if (!result) {

        console.log('there was a problem trying to delete verificationEmail token: ' + req.params.token)
      }

      res.redirect(url(req, '/?emailVerified=true', 'frontend'))

    }).catch(err => {

      res.redirect(url(req, `/?emailVerifiedError=${err.message}`, 'frontend'))
    })
}