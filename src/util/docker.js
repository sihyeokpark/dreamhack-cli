export async function build(name, path) {
  const dockerCMD = `docker build -t ${name.toLowerCase().replaceAll('\'', '')} ${path}`
  console.log(`[*] Docker Build - ${dockerCMD}`)
  await execSync(dockerCMD)
}

export async function run(name, port=80) { // TODO: every port
  const dockerCMD = `docker run -dp ${port}:${port} ${name.toLowerCase().replaceAll('\'', '')}` // if web
  console.log(`[*] Docker Run - ${dockerCMD}`)
  await execSync(dockerCMD)
}