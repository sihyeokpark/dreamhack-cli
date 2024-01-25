import axios from 'axios'

import DREAMHACK from '../data/dreamhack.js'
import Log from '../util/log.js'

export default class Wargame {
  constructor(link) {
    this.link = DREAMHACK.api + link.split('dreamhack.io')[1]
  }

  async init(sessionid) {
    const wargamePage = await axios.get(this.link, {
      headers: {
        Cookie: `sessionid=${sessionid}`
      }
    })
    const wargameJSON = wargamePage.data
  
    this.name = wargameJSON.title
    Log.info(`Wargame Name - ${this.name}`)
    this.downloadLink = wargameJSON.public
  }
}