'use strict'

const guard = require('./guard')

module.exports = (params) => {
  // Guards can throw a Exception and stop execution if any param is invalid
  guard.format(params.format)
  guard.input(params.input)
  guard.output(params.output)
  guard.rate(params.rate)
  guard.threshold(params['threshold-low'], params['threshold-high'])

  return params
}
