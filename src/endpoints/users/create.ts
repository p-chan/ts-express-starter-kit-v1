import * as express from 'express'
import { getRepository } from 'typeorm'
import { User } from '../../db/entities/User'
import { validate } from 'class-validator'

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = new User()
  user.email = req.body.email
  user.name = req.body.name
  user.screenName = req.body.screen_name
  user.hashedPassword = req.body.password

  await validate(user).then(async errors => {
    if (errors.length) {
      const e: any = new Error('bad request')
      e.statusCode = 400
      next(e)
    }
  })

  await getRepository(User).save(user)

  await res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    screen_name: user.screenName
  })
}
