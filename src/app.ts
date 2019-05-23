import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import router from './router'
import errorHandler from './middlewares/errorHandler'
import notFound from './middlewares/notFound'

const app = express()

app.use(helmet())

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

app.use(notFound)
app.use(errorHandler)

export default app
