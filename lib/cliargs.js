'use strict'

const minimist = require('minimist')
const path = require('path')

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
  input: './coverage/clover.xml',
  output: console.log,
  rate: path.resolve('./node_modules/badgifier/lib/rate.js')
}

module.exports = () => {
  return minimist(process.argv.slice(2), {
    alias,
    default: defaults
  })
}
