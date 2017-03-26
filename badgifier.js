'use strict'

const badgifier = require('./lib/')
const params = badgifier.parameters()

badgifier.read(params.input).then((file) => {
  const xml = badgifier.parse(file)
  const rate = badgifier.rate(xml)
  const color = badgifier.color(params, rate)
  const shield = badgifier.shield(rate, color)

  badgifier.output(params, shield)
})
