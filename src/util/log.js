import chalk from 'chalk'

export default class Log {
  static info(message) {
    console.log(chalk.blue(`[*] ${message}`))
  }

  static error(message) {
    console.log(chalk.red(`[-] ${message}`))
  }

  static success(message) {
    console.log(chalk.green(`[+] ${message}`))
  }

  static print(message) {
    console.log(message)
  }
}