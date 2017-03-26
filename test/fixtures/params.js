const rate = require('../../lib/rate')

module.exports = {
  default: {
    _: [],
    input: './coverage/cobertura-coverage.xml',
    i: './coverage/cobertura-coverage.xml',
    output: console.log,
    o: console.log,
    rate: rate,
    r: rate,
    'threshold-high': 95,
    th: 95,
    'threshold-low': 65,
    tl: 65
  }
}
