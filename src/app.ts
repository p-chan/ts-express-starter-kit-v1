import express from 'express'
import bodyParser from 'body-parser'
import router from './router'
import errorHandler from './middlewares/errorHandler'
import notFound from './middlewares/notFound'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

app.use(notFound)
app.use(errorHandler)

export default app
