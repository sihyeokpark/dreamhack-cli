import fs from 'fs'
import axios from 'axios'
import AdmZip from 'adm-zip'

import login from './util/login.js'
import downloadFile from './util/downloadFile.js'
import getArgs from './util/getArgs.js'
import Docker from './class/docker.js'
import Wargame from './class/wargame.js'


async function create(wargameLink) {
  const args = getArgs()
  const PORT=80 // will be changed

  const sessionid = await login()

  const wargame = new Wargame(wargameLink)
  await wargame.init(sessionid)

  await downloadFile(wargame.downloadLink, `${wargame.name}.zip`)
  console.log('[*] Wargame Downloaded')

  const zip = new AdmZip(`${wargame.name}.zip`)
  zip.extractAllTo(`./${wargame.name}`, true)
  console.log('[*] Wargame Extracted')
  await fs.unlinkSync(`${wargame.name}.zip`)
  console.log('[*] Wargame Zip File Removed')

  if (args['d'] || args['docker']) {
    const docker = new Docker(wargame.name, `./${wargame.name}`, PORT)
    docker.build()
    docker.run()
    docker.getPort()
  }

  console.log()
}

create(process.argv[2], process.argv[3])
