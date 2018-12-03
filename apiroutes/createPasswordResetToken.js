const nodemailer = require('../helpers/nodemailer').nodemailer
const crypto = require('crypto')
const db = require('../helpers/database').connection
const url = require('../helpers/url').init

exports.init = function (req, res, next) {

  let passwordToken = {
    token: crypto.randomBytes(16).toString('hex'),
    expires: Date.now() + 86400000,
    type: 'passwordToken'
  }
  let id

  db('users')
    .where('email', req.body.email)
    .first()
    .then(user => {

      if (!user) {

        throw {
          message: 'There is no user with that email.',
          status: 400
        }
      }

      id = user.id
      passwordToken.userid = id

      return db('tokens').where({ userid: id, type: 'passwordToken'}).first()

    }).then(token => {

      if (token) {

        if (token.expires > Date.now()) {

          throw {
            message: 'Your password reset token has not yet expired, please check your email.',
            status: 400
          }

        } else {

          return db('tokens').where({ userid: id, type: 'passwordToken'}).del()
        }
      }

      return

    }).then(() => {

      return db('tokens').insert(passwordToken)

    }).then(token => {

      if (!token) {

        throw {
          message: 'Could not create password token.',
          status: 400
        }
      }

      const urlpath = url(req, `/account/reset/${passwordToken.token}`, 'frontend')

      const emailMessage = 
        `Hello there it seems that you (or someone else) has requested to reset your password.\n\n
         If this was you, click the link below to reset your password.\n\n
         ${urlpath}\n\n
         However if this was not you, ignore this email and your information wont be changed.`

      return nodemailer({
        from: '"Mello Cloud" <jdanmello@gmail.com>',
        to: req.body.email,
        subject: 'Password reset requested for mellocloud.com',
        message: emailMessage
      })

    }).then(() => {

      res.send("Password reset instructions sent.")

    }).catch(err => {

      console.log(err)

      next(err)
    })
}