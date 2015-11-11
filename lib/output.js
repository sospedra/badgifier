'use strict'

const insert = require('./insert')

module.exports = (params, badge) => {
  let output = params.output

  if (typeof output !== 'string') return output(badge)

  // virtual else
  insert(output)
}
