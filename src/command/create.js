import fs from 'fs'
import AdmZip from 'adm-zip'

import User from '../class/user.js'
import Docker from '../class/docker.js'
import Wargame from '../class/wargame.js'

import Log from '../util/log.js'
import downloadFile from '../util/downloadFile.js'
import getArgs from '../util/getArgs.js'

const { email: EMAIL, password: PASSWORD } = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf8'))

export default async function create(wargameLink) {
  const args = getArgs()

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
  }

  console.log()
}
