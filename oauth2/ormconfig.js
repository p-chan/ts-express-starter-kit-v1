const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['./src/db/entities/*.ts'],
  subscribers: ['./src/db/subscribers/*.ts'],
  migrations: ['./src/db/migrations/*.ts'],
  cli: {
    entitiesDir: './src/db/entities',
    subscribersDir: './src/db/subscribers',
    migrationsDir: './src/db/migrations'
  }
}
