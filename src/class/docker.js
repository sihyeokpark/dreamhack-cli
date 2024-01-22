import { execSync } from 'child_process'

import Log from '../util/log.js'

export default class Docker {
  constructor(name, path) {
    this.name = name.toLowerCase().replaceAll(/[^\w\s]/g, '_')
    this.path = path
  }

  async build() {
    try {
      const cmd = `docker build -t ${this.name} ${this.path}`
      Log.info(`Docker Build - ${cmd}`)
      await execSync(cmd, { stdio: 'ignore' })
      return true
    } catch (err) {
      Log.error(`Docker Build Error: ${err}`)
      return false
    }
  }

  async buildCompose(){
    try{
      const cmd = `docker-compose -f ${this.path}/docker-compose.yml up -d`
      Log.info(`Docker Compose Build - ${cmd}`)
      await execSync(cmd, { stdio: 'ignore' })
      return true
    } catch (err) {
      Log.error(`Docker Compose Build Error: ${err}`)
      return false
    }
  }
  
  async run() {
    const cmd = `docker run -dP ${this.name}`
    Log.info(`Docker Run - ${cmd}`)
    this.id = (await execSync(cmd)).toString().slice(0, 12)
    Log.info(`Docker ID - ${this.id}`)
  }

  static async ps() {
    const cmd = 'docker ps'
    const containers = (await execSync(cmd)).toString().split('\n').slice(1, -1).map(container => container.split(/\s{2,}/))
    return containers
  }

  async getPort() {
    const containers = await Docker.ps()
    const container = containers.filter(container => container[0] === this.id)[0]
    const port = container[5].split('->')[0].split(':')[1]
    Log.success(`Link\n- http://localhost:${port}\n- localhost ${port}`)

    return port
  }

  static async getDockerfile() {
    /* 1. traverse all files in wargame directory
     * 2. if there is Dockerfiles(They can be multiple), return paths of all Dockerfiles */
  }
}
