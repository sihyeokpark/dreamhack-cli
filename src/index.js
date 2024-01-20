#!/usr/bin/env node

import fs from 'fs'

fs.readdirSync('./src/command').forEach(async (file) => {
  if (file === process.argv[2] + '.js') {
    const { default: command} = await import(`./command/${file}`)
    command(process.argv[3])
  }
})