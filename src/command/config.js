import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from "url"

import Log from '../util/log.js'
import getArgs from '../util/getArgs.js'

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default async function config() {
  const args = getArgs()
  
  let EMAIL = ''
  let PASSWORD = ''
  try {
    const { email, password } = JSON.parse(await fs.readFileSync(path.join(__dirname, '../data/user.json')))
    EMAIL = email
    PASSWORD = password
  } catch (err) {
    // console.log(err)
  }
  if (args['email']) EMAIL = args['email']
  if (args['password']) PASSWORD = args['password']

  if (args['email'] || args['password']) await fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify({ email: EMAIL, password: PASSWORD }))

  Log.print(chalk.blue('[User Config]'))
  Log.info(`email - ${EMAIL}`)
  Log.info(`password - ${'*'.repeat(PASSWORD.length)}`)
}