const bcrypt = require('bcrypt-nodejs')
const db = require('../helpers/database').connection
const FLUP = require('../helpers/stringfunctions').firstLetterUpperCase
const jwt = require('jsonwebtoken')

exports.init = function (req, res, next) {

  const newUser = {
    first_name: FLUP(req.body.firstName),
    last_name: FLUP(req.body.lastName),
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password)
  }

  db('users')
    .insert(newUser)
    .then(ids => {

      const token = jwt.sign({
        id: ids[0]
      }, process.env.TOKEN_SECRET)

      return res.json({
        token,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        isVerified: 0
      })

    }).catch(err => {

      return res.status(500).send(err.message)
    })
}