const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection

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

        return db('tokens')
          .where('userid', id)
          .first()

      }).then(token => {

        if (token) {

          return db('tokens')
            .where('userid', id)
            .del()
        }

        return 'ok'

      }).then(result => {

        if (!result) {

          throw {
            message: 'Something went wrong trying to delete your account. Maybe try again?',
            status: 400
          }
        }

        return db('users')
          .where('id', id)
          .del()

      }).then(result => {

        if (!result) {

          throw {
            message: 'Something went wrong trying to delete your account. Maybe try again?',
            status: 400
          }
        }

        res.send('Your account has been deleted successfully')

      }).catch(err => {

        next(err)
      })
  })
}

  //       return db('users')
  //         .where('id', decoded.id)
  //         .del()

  //     }).then(result => {

  //       if (!result) {

  //         throw {
  //           message: 'Something went wrong trying to delete your account. Maybe try again?',
  //           status: 400
  //         }
  //       }

  //       res.send('Your account has been deleted successfully')

  //     }).catch(err => {

  //       next(err)
  //     })
  // })