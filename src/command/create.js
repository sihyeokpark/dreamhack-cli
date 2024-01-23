import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
import { fileURLToPath } from "url"

import User from '../class/user.js'
import Docker from '../class/docker.js'
import Wargame from '../class/wargame.js'

import Log from '../util/log.js'
import downloadFile from '../util/downloadFile.js'
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

export default async function create(wargameLink) {
  const args = getArgs()

  if (!wargameLink) {
    Log.error('Wargame link not found. Please run \'dh help\' to see usage.')
    process.exit(1)
  }

  const user = new User(EMAIL, PASSWORD)
  const sessionid = await user.login()

  const wargame = new Wargame(wargameLink)
  await wargame.init(sessionid)

  await downloadFile(wargame.downloadLink, `${wargame.name}.zip`)
  Log.info('Wargame Downloaded')

  const zip = new AdmZip(`${wargame.name}.zip`)
  zip.extractAllTo(`./${wargame.name}`, true)
  Log.info('Wargame Extracted')
  await fs.unlinkSync(`${wargame.name}.zip`)
  Log.info('Wargame Zip File Removed')

  if (args['d'] || args['docker']) {
    const docker = new Docker(wargame.name, `./${wargame.name}`)
    const buildSuccess = await docker.build();
    (buildSuccess) ? Log.success('Docker Build Success') : Log.error('Docker Build Fail')
    if (buildSuccess) {
      await docker.run()
      await docker.getPort()
    } else {
      process.exit(1)
    }
  } else if (args['c'] || args['compose']) {
    const docker = new Docker(wargame.name, `./${wargame.name}`)
    const buildSuccess = await docker.buildCompose();
    (buildSuccess) ? Log.success('Docker Compose Build Success') : Log.error('Docker Compose Build Fail')
    if (buildSuccess) {
      // Todo - Fix getPort
      // await docker.getPort()
    } else {
      process.exit(1)
    }
  }

  console.log()
}
