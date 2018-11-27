const enviroment = process.env.NODE_ENV || 'development'

exports.init = function(req, path) {

  if (enviroment === 'production') {

    return `http://mellocloud.com${path}`

  } else if (/10./.test(req.hostname)) {

    return `http://${req.hostname}${path}`

  } else {

    return `http://${req.hostname}:3000${path}`
  }
}