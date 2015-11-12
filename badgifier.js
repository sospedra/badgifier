'use strict'

const badgifier = require('./lib/')
const params = badgifier.parameters()

badgifier.read(params.input).then((file) => {
  let xml = badgifier.parse(file)
  let rate = badgifier.rate(xml)
  let color = badgifier.color(params, rate)
  let shield = badgifier.shield(rate, color)

  badgifier.output(params, shield)
})
