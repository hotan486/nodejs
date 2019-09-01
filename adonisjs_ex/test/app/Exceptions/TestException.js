'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class TestException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = TestException
