'use strict'

const fs = require('fs')
const readline = require('readline')
const EOL = require('os').EOL

const ALTS = {
  'html': 'alt="badgifier-cobertura"',
  'markdown': '![badgifier-cobertura]'
}

module.exports = (output, shield, textFormat) => {
  const altRef = ALTS[textFormat]
  const chunks = []

  return new Promise((resolve, reject) => {
    readline
      .createInterface({
        input: fs.createReadStream(output)
      })
      .on('line', (line) => {
        if (~line.indexOf(altRef)) {
          chunks.push((textFormat === 'markdown')
            ? `${altRef}(${shield})`
            : `<img src="${shield}" ${altRef} />`)
        } else {
          chunks.push(line)
        }
      })
      .on('close', () => {
        const content = chunks.join(EOL)

        fs.writeFile(output, content, 'utf8', (err) => {
          return err ? reject(err) : resolve(content)
        })
      })
      .on('err', reject)
  })
}
