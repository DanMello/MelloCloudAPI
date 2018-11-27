const nodemailer = require('../helpers/nodemailer').nodemailer

exports.init = function (req, res, next) {

  const message = "From " + req.body.name + "<br>" + req.body.email + "<br>" + req.body.message

  return nodemailer({
    from: '"Dans App" <jdanmello@gmail.com>',
    to: 'jdanmello@gmail.com',
    subject: 'Message from mellocloud.com',
    message: message
  }).then(() => {

    return res.send("Message sent!")

  }).catch(err => {

    return res.status(400).send(err.message)
  })
}