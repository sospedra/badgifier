'use strict'

const fs = require('fs')
const readline = require('readline')
const EOL = require('os').EOL

const sentinel = err => new Error(err)
const altRef = '![badgifier-istanbul-cobertura]'

module.exports = (output, shield) => {
  let tmp = ''
  readline
    .createInterface({
      input: fs.createReadStream(output)
    })
    .on('line', line => {
      if (line.includes(altRef)) line = `${altRef}(${shield})`

      tmp += `${line}${EOL}`
    })
    .on('close', () => {
      fs.writeFile(output, tmp, 'utf8', sentinel)
    })
    .on('err', sentinel)
}
