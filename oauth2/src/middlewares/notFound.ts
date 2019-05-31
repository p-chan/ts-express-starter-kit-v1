import * as express from 'express'

const notFound = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const err: any = new Error('Not Found')
  err.statusCode = 404
  next(err)
}

export default notFound
