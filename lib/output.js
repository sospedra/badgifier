'use strict'

const insert = require('./insert')

module.exports = (params, shield) => {
  let output = params.output

  if (typeof output !== 'string') return output(shield)

  insert(output, shield)
}
