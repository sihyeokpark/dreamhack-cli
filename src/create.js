import axios from 'axios'
import AdmZip from 'adm-zip'
import { execSync } from 'child_process'

import login from './util/login.js'
import downloadFile from './util/downloadFile.js'
import docker from './util/docker.js'

async function create(wargameLink, PORT=80) {
  const sessionid = await login()

  const wargamePage = await axios.get(wargameLink, {
    headers: {
      Cookie: `sessionid=${sessionid}`
    }
  })

  const wargameName = wargamePage.data.split('class="challenge-info"')[1].split('</h1>')[0].split('>').at(-1).replaceAll(' ', '_')
  console.log(`[*] Wargame Name - ${wargameName}`)
  const wargameDownloadLink = 'https://sfo2.digitaloceanspaces.com/' + wargamePage.data.split('" target="_blank" class="challenge-download"')[0].split('<a href="https://sfo2.digitaloceanspaces.com/')[1].replaceAll('amp;', '')
  console.log(`[*] Wargame Download Link - ${wargameDownloadLink}`)

  await downloadFile(wargameDownloadLink, `${wargameName}.zip`)
  console.log('[*] Wargame Downloaded')

  const zip = new AdmZip(`${wargameName}.zip`)
  zip.extractAllTo(`./${wargameName}`, true)

  docker.build(wargameName, `./${wargameName}`)

  docker.run(wargameName, PORT)

  console.log()
}

create(process.argv[2], process.argv[3])