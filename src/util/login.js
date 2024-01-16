import axios from 'axios'

import USER from '../data/user.js'
import DREAMHACK from '../data/dreamhack.js'

export default async function login() {
  const loginPage = await axios.post(`${DREAMHACK.url}/api/v1/auth/login/`, {
    email: USER.email,
    password: USER.password,
    saveLogin: true
  })
  const csrfToken = loginPage.headers['set-cookie'][0].split('csrf_token=')[1].split(';')[0]
  const sessionid = loginPage.headers['set-cookie'][1].split('sessionid=')[1].split(';')[0]
  console.log(`[*] Login - sessionid=${sessionid}`)

  return sessionid
}