'use strict'

const { Command } = require('@adonisjs/ace')

class Test extends Command {
  static get signature () {
    return 'test'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    this.info('Dummy implementation for test command')
  }
}

module.exports = Test
