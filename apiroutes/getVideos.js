const jwt = require('jsonwebtoken')
const db = require('../helpers/database').connection

exports.init = function (req, res, next) {

  console.log(req.body)
  
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

        return db('videos')
          .where({
            userid: user.id,
            project: req.body.projectName
          })

      }).then(videos => {

        res.json({
          videos,
          type: 'videos'
        })

      }).catch(err => {

        next(err)
      })
  })
}