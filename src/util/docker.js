import { execSync } from 'child_process'

export default class Docker {
  constructor(name, path, port) {
    this.name = name.toLowerCase().replaceAll('\'', '')
    this.path = path
    this.port = port
  }

  async build() {
    const dockerCMD = `docker build -t ${this.name} ${this.path}`
    console.log(`[*] Docker Build - ${dockerCMD}`)
    await execSync(dockerCMD)
  }
  
  async run() { // TODO: every port
    const dockerCMD = `docker run -dp ${this.port}:${this.port} ${this.name}` // if web
    console.log(`[*] Docker Run - ${dockerCMD}`)
    await execSync(dockerCMD)
  }

  static async getDockerfile() {
    /* 1. traverse all files in wargame directory
     * 2. if there is Dockerfiles(They can be multiple), return paths of all Dockerfiles */
  }
}

