import moment from "moment";

export class LogService {

  private name: string

  constructor(name: string) {
    this.name = name;
  }

  info(...args: any[]) {
    console.info(`\x1b[1;37m[${this.now}] \x1b[0m \x1b[1;36m${this.name}\x1b[0m -> `, ...args)
  }

  error(...args: any[]) {
    console.info(`\x1b[1;37m[${this.now}] \x1b[0m \x1b[1;31m${this.name}\x1b[0m -> `, ...args)
  }

  debug(...args: any[]) {
    console.info(`\x1b[1;37m[${this.now}] \x1b[0m \x1b[1;33m${this.name}\x1b[0m -> `, ...args)
  }
  
  log(...args: any[]) {
    console.info(`\x1b[1;37m[${this.now}] \x1b[0m \x1b[1;37m${this.name}\x1b[0m -> `, ...args)
  }

  private get now() {
    return moment().utc().format('YYYY-MM-DD HH:mm:ss')
  }
}