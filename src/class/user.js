import axios from 'axios'

import Log from '../util/log.js'

import DREAMHACK from '../data/dreamhack.js'

export default class User {
  constructor(email, password) {
    this.email = email
    this.password = password
  }

  async login() {
    let loginPage
    try {
      loginPage = await axios.post(`${DREAMHACK.api}/auth/login/`, {
        email: this.email,
        password: this.password,
        saveLogin: true
      })
    } catch (err) {
      Log.error('Login Fail')
      process.exit(1)
    }
    const csrfToken = loginPage.headers['set-cookie'][0].split('csrf_token=')[1].split(';')[0]
    const sessionid = loginPage.headers['set-cookie'][1].split('sessionid=')[1].split(';')[0]
    Log.success(`Login - sessionid=${sessionid}`)
  
    return sessionid
  }
}