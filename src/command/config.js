import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { fileURLToPath } from "url"

import Log from '../util/log.js'
import getArgs from '../util/getArgs.js'

const __dirname = fileURLToPath(new URL(".", import.meta.url))

export default async function config() {
  const args = getArgs()
  
  let [email, password] = ['', '']
  try {
    email, password = JSON.parse(await fs.readFileSync(path.join(__dirname, '../data/user.json')))
  } catch (err) {}
  if (args['email']) email = args['email']
  if (args['password']) password = args['password']

  await fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify({ email, password }))

  Log.print(chalk.blue('[User Config]'))
  Log.info(`Email - ${email}`)
  Log.info(`Password - ${'*'.repeat(password.length)}`)
}