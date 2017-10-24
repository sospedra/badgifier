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
  let tmp = ''

  readline
    .createInterface({
      input: fs.createReadStream(output)
    })
    .on('line', (line) => {
      if (line.includes(altRef)) {
        line = (textFormat === 'markdown')
          ? `${altRef}(${shield})`
          : `<img src="${shield}" ${altRef} />`
      }

      tmp += `${line}${EOL}`
    })
    .on('close', () => {
      fs.writeFile(output, tmp, 'utf8', sentinel)
    })
    .on('err', sentinel)
}
