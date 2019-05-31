import * as express from 'express'

const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err.isBoom) {
    const statusCode = err.output.statusCode
    const payload = err.output.payload

    res.status(statusCode).json(payload)
  } else {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
      error: {
        statusCode: statusCode,
        error: '',
        message: err.message
      }
    })
  }
}

export default errorHandler
