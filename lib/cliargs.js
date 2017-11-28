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
  rate: './node_modules/badgifier/lib/rate.js'
}

module.exports = () => {
  const params = minimist(process.argv.slice(2), {
    alias,
    default: defaults
  })

  return Object.assign({}, params, {
    input: path.resolve(params.input),
    rate: path.resolve(params.rate),
    output: typeof params.output === 'string'
      ? path.resolve(params.output)
      : params.output
  })
}
