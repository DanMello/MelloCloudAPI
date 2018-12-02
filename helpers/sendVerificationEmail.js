const nodemailer = require('./nodemailer').nodemailer
const crypto = require('crypto')
const db = require('./database').connection
const url = require('./url').init

exports.init = function (req, id, email) {

  const emailToken = {
    userid: id,
    token: crypto.randomBytes(16).toString('hex'),
    expires: Date.now() + 86400000,
    type: 'verificationEmail'
  }

  return db('tokens')
    .where({
      userid: id,
      type: 'verificationEmail'
    })
    .first()
    .then(token => {

      if (token && token.expires > Date.now()) {

        throw {
          message: 'Your token has not yet expired, please check your email.',
          status: 400
        }
      }

      if (token && token.expires < Date.now()) {

        return db('tokens')
          .where({
            userid: id,
            type: 'verificationEmail'
          })
          .del()
      }

    }).then(result => {

      if (!!result) {

        throw {
          message: 'There was a problem sending verification email.',
          status: 400
        }
      }

      return db('tokens').insert(emailToken)

    }).then(result => {

      if (!result) {

        throw {
          message: 'There was a problem sending verification email.',
          status: 400
        }
      }

      const urlpath = url(req, `/account/verification/${emailToken.token}`, 'backend')

      const emailMessage =
        `Hello, please verify your account by clicking the link\n\n
         ${urlpath}\n\n
        `
      return nodemailer({
        from: '"Mello Cloud" <jdanmello@gmail.com>',
        to: email,
        subject: 'Account verification from mellocloud',
        message: emailMessage
      })

    }).catch(err => {

      throw err
    })
}