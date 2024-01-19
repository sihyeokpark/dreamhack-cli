import { execSync } from 'child_process'

export default class Docker {
  constructor(name, path, port) {
    this.name = name.toLowerCase().replaceAll('\'', '')
    this.path = path
    this.port = port
  }

  async build() {
    const cmd = `docker build -t ${this.name} ${this.path}`
    console.log(`[*] Docker Build - ${cmd}`)
    await execSync(cmd)
  }
  
  async run() {
    const cmd = `docker run -dP ${this.name}` // if web
    console.log(`[*] Docker Run - ${cmd}`)
    this.id = (await execSync(cmd)).toString().slice(0, 12)
    console.log(`[*] Docker ID: ${this.id}`)
  }

  static async ps() {
    const cmd = 'docker ps'
    const containers = (await execSync(cmd)).toString().split('\n').slice(1, -1).map(container => container.split('   '))
    return containers
  }

  async getPort() {
    const containers = await Docker.ps()
    const container = containers.filter(container => container[0] === this.id)[0]
    const port = container[5].split('->')[0].split(':')[1]
    console.log(`[*] Link: http://localhost:${port}`)

    return port
  }

  static async getDockerfile() {
    /* 1. traverse all files in wargame directory
     * 2. if there is Dockerfiles(They can be multiple), return paths of all Dockerfiles */
  }
}
