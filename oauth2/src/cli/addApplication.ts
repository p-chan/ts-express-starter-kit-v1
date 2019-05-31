import { createConnection, getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { cli } from 'cli-ux'
import { Application } from '../db/entities/Application'

createConnection()
  .then(async connection => {
    let application = new Application()
    application.name = await cli.prompt('What is application name?')
    application.ownerUserId = await cli.prompt('What is owner user id?')

    await cli.confirm('Continue?')

    await validate(application).then(async errors => {
      if (errors.length) {
        console.error(errors)
        throw new Error('Error')
      }
    })

    application = await getRepository(Application).save(application)

    console.log(application)

    process.exit(0)
  })
  .catch(error => {
    console.error(error)
  })
