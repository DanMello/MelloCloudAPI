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
      }
    },
    headers: function (req, res, next) {

      if (enviroment === 'development') {

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
    },
    deployment: {
      apps: [
        {
          name : 'MelloCloudAPI',
          script : './index.js',
          env: {
            "NODE_ENV": "production",
          }
        }
      ],
      deploy: {
        production: {
          user: 'deploy',
          host: '10.0.0.201', // local ip or public ip if im not connect to local connection
          ref: 'origin/master',
          repo: 'https://github.com/DanMello/MelloCloudAPI.git',
          path: '/home/deploy/MelloCloud/MelloCloudAPI',
          'post-deploy' : 'nvm install && npm install && /home/deploy/.nvm/versions/node/v8.11.3/bin/pm2 reload ecosystem.config.js --env production --only MelloCloudAPI'
        }
      }
    }
  }

  return {
    enviroment,
    settings
  }
}
