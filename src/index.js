#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import { fileURLToPath } from "url"
const __dirname = fileURLToPath(new URL(".", import.meta.url))

async function main() {
  const files = await fs.readdirSync(path.join(__dirname, `./command`))
  for (let i = 0; i < files.length; i++) {
    if (files[i] === process.argv[2] + '.js') {
      const { default: command} = await import('file:///'+path.join(__dirname, `./command/${files[i]}`))
      await command(process.argv[3])
      return true
    }
  }

  const { default: command} = await import('file:///'+path.join(__dirname, `./command/help.js`))
  await command()
  return false
}

main()