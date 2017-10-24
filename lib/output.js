'use strict'

const insert = require('./insert')

module.exports = (params, shield) => {
  const output = params.output
  const format = params.format

  if (typeof output !== 'string') return output(shield)

  insert(output, shield, format)
}
