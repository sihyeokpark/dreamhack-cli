import axios from 'axios'

import login from './util/login.js'
import downloadFile from './util/downloadFile.js'

async function create(wargameLink) {
  const sessionid = await login()

  const wargamePage = await axios.get(wargameLink, {
    headers: {
      Cookie: `sessionid=${sessionid}`
    }
  })

  const wargameDownloadLink = 'https://sfo2.digitaloceanspaces.com/' + wargamePage.data.split('문제 파일 받기')[0].split('" target="_blank" class="challenge-download"')[0].split('<a href="https://sfo2.digitaloceanspaces.com/')[1].replaceAll('amp;', '')
  console.log(`[*] Wargame Download Link - ${wargameDownloadLink}`)

  await downloadFile(wargameDownloadLink, 'wargame.zip')
  console.log('[*] Wargame Downloaded')

  console.log()
}

create(process.argv[2])