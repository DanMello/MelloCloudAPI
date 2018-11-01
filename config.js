exports = module.exports = function(app) {

  let application = app || {}
  
  let enviroment = process.env.NODE_ENV || 'development'

  let settings = {
    development: {
      database: {
        client: 'mysql',
        connection: {
          host: 'localhost', // Default local mysql host
          user: 'root', // Put your user for mysql here
          password: 'Mysecurepassword1!',
          database: 'mellocloud' // Put your development database name here, for this project
        }
      },
      tokenSecret: 'legalseafoods'
    },
    production: {
      database: {
        client: 'mysql',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        }
      },
      tokenSecret: process.env.TOKEN_SECRET
    },
    headers: function (req, res, next) {

      if (enviroment === 'development') {

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader("Access-Control-Allow-Methods", "GET,POST")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

      } else if (enviroment === 'production') {

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader("Access-Control-Allow-Methods", "GET,POST")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
      }
      
      next()
    },
    urlencodedParser: {
      extended: false,
      limit: '50mb'
    },
    jsonParser: {
      limit: '50mb'
    }
  }

  return {
    enviroment,
    settings
  }
}
