exports.init = function(err, req, res, next) {

  if (err.status === 400) {

    return res.status(400).send(err.message)

  } else {

    return res.status(500).send(err.message)
  }
}