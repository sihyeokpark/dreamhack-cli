import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url"

import User from '../class/user.js'
import Wargame from '../class/wargame.js'

import Log from '../util/log.js'
import getArgs from '../util/getArgs.js'

const __dirname = fileURLToPath(new URL(".", import.meta.url))
let EMAIL, PASSWORD
try {
  const { email, password } = JSON.parse(await fs.readFileSync(path.join(__dirname, '../data/user.json'), 'utf8'))
  EMAIL = email
  PASSWORD = password
} catch (err) {
  Log.error('User config not found. Please run \'dh config\' to set user config.')
  process.exit(1)
}

export default async function vm(wargameLink) {
  const args = getArgs()

  if (!wargameLink) {
    Log.error('Wargame link not found. Please run \'dh help\' to see usage.')
    process.exit(1)
  }

  const user = new User(EMAIL, PASSWORD)
  const cookie = await user.login()

  const wargame = new Wargame(wargameLink)
  await wargame.init(cookie['sessionid'])

  if (args['c'] || args['create']) {
    await wargame.create(cookie['sessionid'], cookie['csrf_token'])
    await wargame.get(cookie['sessionid'])
  } else if (args['g'] || args['get']) {
    await wargame.get(cookie['sessionid'])
  } else if (args['d'] || args['delete']) {
    await wargame.delete(cookie['sessionid'], cookie['csrf_token'])
  } else {
    Log.error('Invalid command for \'dh vm\'. Please run \'dh help\' to see usage.')
    process.exit(1)
  }
}
