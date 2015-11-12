'use strict'

const minimist = require('minimist')

const alias = {
  input: 'i',
  output: 'o',
  threshold_high: 'th',
  threshold_low: 'tl'
}

const defaults = {
  input: './coverage/cobertura-coverage.xml',
  output: console.log,
  threshold_high: 95,
  threshold_low: 65
}

module.exports = () => {
  return minimist(process.argv.slice(2), {
    alias,
    default: defaults
  })
}
