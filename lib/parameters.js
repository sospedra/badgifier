'use strict'

const minimist = require('minimist')
const rate = require('./rate')

const alias = {
  input: 'i',
  output: 'o',
  rate: 'r',
  'threshold-high': 'th',
  'threshold-low': 'tl'
}

const defaults = {
  input: './coverage/cobertura-coverage.xml',
  output: console.log,
  rate,
  'threshold-high': 95,
  'threshold-low': 65
}

module.exports = () => {
  return minimist(process.argv.slice(2), {
    alias,
    default: defaults
  })
}
