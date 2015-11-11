'use strict'

const fs = require('fs')
const read = require('./read')

const sentinel = err => new Error(err)

module.exports = (output, badge) => {
  read(output)
    .then((file) => {
      let transformed = file.replace(/%%badgifier-replace-here%%/g, badge)

      fs.writeFile(output, transformed, 'utf8', sentinel)
    })
    .fail(sentinel)
}