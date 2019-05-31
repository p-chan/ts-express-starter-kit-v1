import * as express from 'express'
import { getRepository } from 'typeorm'
import { Application } from '../../db/entities/Application'
import { User } from '../../db/entities/User'
import Boom from '@hapi/boom'
import jwt from 'jsonwebtoken'

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let clientId = ''
  let clientSecret = ''

  const grantType = req.body.grant_type
  const username = req.body.username
  const password = req.body.password

  // client_id と client_secret の存在を確認
  if (req.headers.authorization) {
    const encodedAuthz = req.headers.authorization.split(' ')[1]
    const decodedAuthz = Buffer.from(encodedAuthz, 'base64').toString()
    clientId = decodedAuthz.split(':')[0]
    clientSecret = decodedAuthz.split(':')[1]
  } else if (req.body.client_id && req.body.client_secret) {
    clientId = req.body.client_id
    clientSecret = req.body.client_secret
  } else {
    throw Boom.unauthorized('client_id and client_secret are required')
  }

  // client_id からアプリケーションを検索
  const application = await getRepository(Application)
    .findOneOrFail({
      clientId: clientId
    })
    .catch(() => {
      throw Boom.badImplementation()
    })

  // アプリケーションが存在しない
  if (!application) throw Boom.unauthorized('client_id is invalid')

  // client_secret が間違っている
  if (clientSecret !== application.clientSecret)
    throw Boom.unauthorized('client_secret is invalid')

  // Check password grant
  if (grantType !== 'password') {
    throw Boom.badRequest('grant_type only supports password')
  }

  // username からユーザーを検索
  const user = await getRepository(User)
    .findOneOrFail({
      screenName: username
    })
    .catch(() => {
      throw Boom.badImplementation()
    })

  // ユーザーが存在しない
  if (!user) throw Boom.unauthorized('username is invalid')

  // パスワードがhash化したパスワードと一致するか確認
  const isValid = await User.comperePassword(password, user.password)
  if (!isValid) throw Boom.unauthorized('password is invalid')

  const accessToken = jwt.sign(
    {
      iss: 'example.com',
      sub: 'auth',
      aud: 'example.com',
      exp: 1234,
      iat: 1234,
      user_id: user.id
    },
    'hogefuga1234'
  )

  res.json({
    access_token: accessToken,
    token_type: 'bearer',
    expires_in: 123456,
    refresh_token: ''
  })
}
