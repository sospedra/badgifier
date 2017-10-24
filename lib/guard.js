/* eslint-disable no-eval */
const fs = require('fs')
const path = require('path')

const HEAD = '[Badgifier error] Unexpected'
const FORMATS = ['markdown', 'html']
const errors = {
  format: (param) => `${HEAD} format ${param}. Expected one of: ${FORMATS.join(', ')}`,
  input: (param) => `${HEAD} input ${param}. Expected a readable file`,
  output: (param) => `${HEAD} output ${param}. Expected a writable file or stdout`,
  range: (tl, th) => `${HEAD} threshold range from ${tl} to ${th} [low, high]. Expected high to be greater than low`,
  rate: (param) => `${HEAD} rate (${param.slice(15)}...). Expected an evaluable javascript function`,
  threshold: (param, level) => `${HEAD} threshold-${level} ${param}. Expected an integer between 0 and 100`
}

const isValidThreshold = (threshold) => {
  return Number.isInteger(threshold) && threshold >= 0 && threshold <= 100
}

const guard = module.exports = {}

guard.format = (format) => {
  if (!FORMATS.includes(format)) {
    throw Error(errors.format(format))
  }
}

guard.input = (input) => {
  fs.exists(path.resolve(input), (exists) => {
    if (!exists) throw Error(errors.input(input))
  })
}

guard.output = (output) => {
  // @FIXME detect is stdout
}

guard.rate = (rate) => {
  try {
    eval(rate)
  } catch (ex) {
    throw Error(errors.rate(rate))
  }
}

guard.threshold = (tl, th) => {
  if (!isValidThreshold(tl)) throw Error(errors.threshold(tl, 'low'))
  if (!isValidThreshold(th)) throw Error(errors.threshold(th, 'high'))
  if (tl >= th) throw Error(errors.range(tl, th))
}
