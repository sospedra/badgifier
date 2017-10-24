'use strict'

const minimist = require('minimist')
const guard = require('./guard')
const rate = require('./rate')

const alias = {
  'threshold-high': 'th',
  'threshold-low': 'tl',
  format: 'f',
  input: 'i',
  output: 'o',
  rate: 'r'
}

const defaults = {
  'threshold-high': 95,
  'threshold-low': 65,
  format: 'markdown',
  input: './coverage/cobertura-coverage.xml',
  output: console.log,
  rate
}

module.exports = () => {
  const params = minimist(process.argv.slice(2), {
    alias,
    default: defaults
  })

  // Guards can throw a Exception and stop execution if any param is invalid
  guard.format(params.format)
  guard.input(params.input)
  guard.output(params.output)
  guard.rate(params.rate)
  guard.threshold(params['threshold-low'], params['threshold-high'])

  return params
}
