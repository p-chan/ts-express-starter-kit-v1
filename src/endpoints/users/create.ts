import * as express from 'express'
import { getRepository } from 'typeorm'
import { User } from '../../db/entities/User'

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const user = new User()
  user.email = req.body.email
  user.name = req.body.name
  user.screenName = req.body.screen_name
  await user.hashPassword(req.body.password)
  await getRepository(User).save(user)

  res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    screen_name: user.screenName
  })
}
