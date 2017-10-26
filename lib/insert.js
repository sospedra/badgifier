'use strict'

const fs = require('fs')
const readline = require('readline')
const EOL = require('os').EOL

const sentinel = (err) => new Error(err)
const ALTS = {
  'html': 'alt="badgifier-cobertura"',
  'markdown': '![badgifier-cobertura]'
}

module.exports = (output, shield, textFormat) => {
  const altRef = ALTS[textFormat]
  const chunks = []

  readline
    .createInterface({
      input: fs.createReadStream(output)
    })
    .on('line', (line) => {
      if (~line.indexOf(altRef)) {
        chunks.push((textFormat === 'markdown')
          ? `${altRef}(${shield})`
          : `<img src="${shield}" ${altRef} />`)
      }
    })
    .on('close', () => {
      fs.writeFile(output, chunks.join(EOL), 'utf8', sentinel)
    })
    .on('err', sentinel)
}
