import axios from 'axios'

import Log from '../util/log.js'

export default class Wargame {
  constructor(link) {
    this.link = link
  }

  async init(sessionid) {
    const wargamePage = await axios.get(this.link, {
      headers: {
        Cookie: `sessionid=${sessionid}`
      }
    })
  
    this.name = wargamePage.data.split('class="challenge-info"')[1].split('</h1>')[0].split('>').at(-1).replaceAll(' ', '_')
    Log.info(`Wargame Name - ${this.name}`)
    this.downloadLink = 'https://sfo2.digitaloceanspaces.com/' + wargamePage.data.split('" target="_blank" class="challenge-download"')[0].split('<a href="https://sfo2.digitaloceanspaces.com/')[1].replaceAll('amp;', '')
  }
}