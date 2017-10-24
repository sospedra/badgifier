const rate = require('../../lib/rate')

module.exports = {
  _: [],
  input: './coverage/clover.xml',
  i: './coverage/clover.xml',
  output: console.log,
  o: console.log,
  rate: rate,
  r: rate,
  'threshold-high': 95,
  th: 95,
  'threshold-low': 65,
  tl: 65
}
