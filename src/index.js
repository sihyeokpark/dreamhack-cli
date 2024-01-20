#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import { fileURLToPath } from "url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

fs.readdirSync(path.join(__dirname, `./command`)).forEach(async (file) => {
  if (file === process.argv[2] + '.js') {
    const { default: command} = await import('file:///'+path.join(__dirname, `./command/${file}`))
    command(process.argv[3])
    process.exit(0)
  }
})

const { default: command} = await import('file:///'+path.join(__dirname, `./command/help.js`))
command()