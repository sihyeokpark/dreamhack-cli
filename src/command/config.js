import fs from 'fs'
import chalk from 'chalk'

import Log from '../util/log.js'
import getArgs from '../util/getArgs.js'

export default async function config() {
  const args = getArgs()

  let { email, password } = JSON.parse(await fs.readFileSync('./src/data/user.json'))

  if (args['email']) email = args['email']
  if (args['password']) password = args['password']

  await fs.writeFileSync('./src/data/user.json', JSON.stringify({ email, password }))

  Log.print(chalk.blue('[User Config]'))
  Log.info(`Email - ${email}`)
  Log.info(`Password - ${'*'.repeat(password.length)}`)
}