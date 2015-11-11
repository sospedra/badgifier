'use strict'

const fs = require('fs')

let files = fs.readdirSync(__dirname)
  .filter(x => x !== 'index.js')
  .map(x => x.slice(0, -3))
  .reduce((stack, file) => {
    stack[file] = require(`./${file}`)
    return stack
  }, {})

module.exports = files
