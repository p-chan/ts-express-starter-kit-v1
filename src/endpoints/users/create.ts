import * as express from 'express'
import { getRepository } from 'typeorm'
import { User } from '../../db/entities/User'
import { validate } from 'class-validator'

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let user = new User()
  user.email = req.body.email
  user.name = req.body.name
  user.screenName = req.body.screen_name
  user.password = req.body.password

  const errors = await validate(user)

  if (errors.length) {
    console.error(errors)

    const firstError = errors[0].constraints

    for (const error in firstError) {
      if (firstError.hasOwnProperty(error)) {
        const e: any = new Error(firstError[error])
        e.statusCode = 400
        throw e
      }
    }
  }

  user = await getRepository(User).save(user)

  await res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    screen_name: user.screenName
  })
}
