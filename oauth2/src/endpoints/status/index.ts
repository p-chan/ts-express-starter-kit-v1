import * as express from 'express'

const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.json({
    status: 'ok'
  })
}

export default {
  index: index
}
