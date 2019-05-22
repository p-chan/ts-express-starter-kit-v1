import * as express from 'express'

const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    error: {
      statusCode: statusCode,
      message: err.message
    }
  })
}

export default errorHandler
