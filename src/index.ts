import 'reflect-metadata'
import { createConnection } from 'typeorm'
import app from './app'
import http from 'http'

createConnection()
  .then(async connection => {
    http.createServer(app).listen(3000, () => {
      console.log('server is running on port 3000')
    })
  })
  .catch(error => {
    console.error(error)
  })
