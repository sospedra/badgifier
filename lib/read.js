'use strict'

const fs = require('fs')

module.exports = (pathFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, 'utf8', (err, file) => {
      if (err) return reject(err)
      resolve(file)
    })
  })
}
