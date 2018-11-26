const enviroment = process.env.NODE_ENV || 'development'
const knex = require('knex')

const settings = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Mysecurepassword1!',
      database: 'mellocloud'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  }
}

exports.connection = knex(settings[enviroment])