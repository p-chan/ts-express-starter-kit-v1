import Router from 'express-promise-router'
import endpoints from './endpoints'

const router = Router()

router.get('/', (req, res) => {
  res.send('hello world')
})

router.get('/status', endpoints.status.index)
router.post('/users', endpoints.users.create)

router.get('/error', (req, res, next) => {
  const err: any = new Error()
  err.message = 'error'
  err.statusCode = 500
  next(err)
})

export default router
