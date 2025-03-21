import path from 'path'
import axios from 'axios'

import DREAMHACK from '../data/dreamhack.js'
import Log from '../util/log.js'

export default class Wargame {
  constructor(link) {
    const wargameURL = new URL(link)
    this.link = DREAMHACK.api + wargameURL.pathname

    const wargameAPIURL = new URL(this.link)
    wargameAPIURL.pathname = path.join(wargameAPIURL.pathname, 'live/')
    this.vmLink = wargameAPIURL.href

    const submitAPIURL = new URL(this.link)
    submitAPIURL.pathname = path.join(submitAPIURL.pathname, 'auth/')
    this.submitLink = submitAPIURL.href
  }

  async init(sessionid) {
    const wargamePage = await axios.get(this.link, {
      headers: { Cookie: `sessionid=${sessionid}` }
    })
    const wargameJSON = wargamePage.data
  
    this.name = wargameJSON.title.toLowerCase().replaceAll(/[^\w\s]/g, '_')
    Log.info(`Wargame Name - ${this.name}`)
    this.downloadLink = wargameJSON.public
  }

  async create(sessionid, csrfToken) {
    // TODO error handling problem with no VM
    const result = await axios.post(this.vmLink, {}, {
      headers: {
        Cookie: `sessionid=${sessionid}; csrf_token=${csrfToken}`,
        'x-csrftoken': csrfToken
      }
    })

    Log.success(`VM created - vmid=${result.data.vmid}`)
  }

  async get(sessionid) {
    const VMPage = await axios.get(this.vmLink, {
      headers: { Cookie: `sessionid=${sessionid}` }
    })

    const host = VMPage.data.host
    const portMap = VMPage.data.port_mappings

    if (host && portMap) {
      Log.success(`VM is running`)
      Log.info(`Host: ${host}`)
      Log.info(`Port: ${portMap
        .map((val) => `${val[1]}/${val[0]} -> ${val[2]}/${val[0]}`)
        .reduce((prev, curr, idx) => (idx === 0 ? curr : `${prev}, ${curr}`))
      }`)
      Log.info(`pwnable: ${portMap
        .map((val) => `nc ${host} ${val[1]}`)
        .reduce((prev, curr, idx) => (idx === 0 ? curr : `${prev}, ${curr}`))
      }`)
      Log.info(`web: ${portMap
        .map((val) => `https://${host}:${val[1]}/`)
        .reduce((prev, curr, idx) => (idx === 0 ? curr : `${prev}, ${curr}`))
      }`)
    } else {
      Log.error(`VM is not running`)
    }
  }

  async delete(sessionid, csrfToken) {
    // TODO error handling problem with no VM
    await axios.delete(this.vmLink, {
      headers: {
        Cookie: `sessionid=${sessionid}; csrf_token=${csrfToken}`,
        'x-csrftoken': csrfToken
      }
    })

    Log.success('VM deleted')
  }

  async submit(flag, sessionid, csrfToken) {
    await axios.post(this.submitLink, {
      flag: flag
    }, {
      headers: {
        Cookie: `sessionid=${sessionid}; csrf_token=${csrfToken}`,
        'x-csrftoken': csrfToken
      }
    }).then(() => {
      Log.success('Correct!')
    }).catch((err) => {
      if (err.response?.status === 400) {
        Log.error(`Wrong: ${err.response?.data.flag[0]}`)
        Log.info(`Submitted flag: ${flag}`)
      } else {
        throw err;
      }
    })
  }
}
