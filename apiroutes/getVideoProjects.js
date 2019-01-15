const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection

exports.init = function (req, res, next) {

  const token = req.body.token || req.params.token
  
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {

    if (err) next(err)

    db('users')
      .where('id', decoded.id)
      .first()
      .then(user => {

        if (!user) {

          throw {
            message: 'Invalid token, please log out and log back in.',
            status: 400
          }
        }

        return db('projects').where('userid', user.id)

      }).then(projects => {

        res.json({
          projects,
          type: 'projects'
        })

      }).catch(err => {

        next(err)
      })
  })
}