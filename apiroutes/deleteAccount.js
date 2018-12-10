const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection

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

        return db('tokens')
          .where('userid', decoded.id)
          .del()

      }).then(result => {

        if (!result) {

          throw {
            message: 'Something went wrong trying to delete your account. Maybe try again?',
            status: 400
          }
        }

        return db('users')
          .where('id', decoded.id)
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