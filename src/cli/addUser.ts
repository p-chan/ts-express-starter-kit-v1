import { createConnection, getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { cli } from 'cli-ux'
import { User } from '../db/entities/User'

createConnection()
  .then(async connection => {
    let user = new User()
    user.name = await cli.prompt('What is your name?')
    user.screenName = await cli.prompt('What is your screen name')
    user.email = await cli.prompt('What is your email')
    user.password = await cli.prompt('What is your password?', { type: 'hide' })

    await cli.confirm('Continue?')

    await validate(user).then(async errors => {
      if (errors.length) {
        console.error(errors)
        throw new Error('Error')
      }
    })

    user = await getRepository(User).save(user)

    console.log(user)

    process.exit(0)
  })
  .catch(error => {
    console.error(error)
  })
