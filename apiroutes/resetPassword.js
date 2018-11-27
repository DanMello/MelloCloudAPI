const db = require('../helpers/database').connection
const bcrypt = require('bcrypt-nodejs')
const nodemailer = require('../helpers/nodemailer').nodemailer

exports.init = function (req, res, next) {

  let userObj = {}

  db('tokens')
    .where({
      token: req.body.token,
      type: 'passwordToken'
    })
    .first()
    .then(token => {

      if (!token) {
        throw {
          message: 'Token not found.',
          status: 400
        }
      }

      if (token.expires < Date.now()) {

        return db('tokens').where({token: req.body.token, type: 'passwordToken'}).del()
      }

      userObj.id = token.userid

      return

    }).then(result => {

      if (result) {

        throw {
          message: 'Password reset token has expired.',
          status: 400
        }
      }

      return db('users')
        .where('id', userObj.id)
        .first()

    }).then(user => {

      if (!user) {

        throw {
          message: 'Something went wrong trying to change your password. Maybe try again?',
          status: 400
        }
      }

      userObj.email = user.email

      return db('users')
        .where('id', userObj.id)
        .update({
          password: bcrypt.hashSync(req.body.password)
        })

    }).then(result => {

      if (!result) {

        throw {
          message: 'Something went wrong trying to change your password. Maybe try again?',
          status: 400
        }
      }

      return db('tokens').where({token: req.body.token, type: 'passwordToken'}).del()

    }).then(result => {

      if (!result) {

        console.log("There was a problem deleting password reset token", req.body.token)
      }

      const emailMessage = 
        `Your password has been changed.\n\n
         If this was not you, that means someone else has access to your email.\n\n
         We recomend changing your email password, then chaging your password in our app.\n\n
         However if this you, this email is just to confirm of your password reset.
        `
      return nodemailer({
        from: '"Dans App" <jdanmello@gmail.com>',
        to: userObj.email,
        subject: 'Your password has been reset',
        message: emailMessage
      })

    }).then(() => {

      res.send('Password has been changed successfully.')

    }).catch(err => {

      next(err)
    })
}