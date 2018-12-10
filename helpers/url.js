const enviroment = process.env.NODE_ENV || 'development'

exports.init = function(req, path, type) {

  if (enviroment === 'production' && type === 'frontend') {

    return `https://mellocloud.com${path}`

  } else if (enviroment === 'production' && type === 'backend') {

    return `https://api.mellocloud.com${path}`

  } else if (/10./.test(req.hostname) && type === 'frontend') {

    return `http://${req.hostname}${path}`

  } else if (/10./.test(req.hostname) && type === 'backend') {

    return `http://${req.hostname}:3001${path}`

  } else if (type === 'frontend') {

    return `http://${req.hostname}:3000${path}`

  } else if (type === 'backend') {

    return `http://${req.hostname}:3001${path}`
  }
}