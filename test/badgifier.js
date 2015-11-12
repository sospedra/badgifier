'use strict'

const tape = require('tape')

const badgifier = require('../lib/')

let fixtures = {
  params: require('./fixtures/params')
}
let tests = []
let next = () => tests.shift()()

tests.push(() => {
  tape('Can generate default parameters', (t) => {
    t.plan(5)

    let params = badgifier.parameters()
    let defaultParams = fixtures.params.default

    t.deepLooseEqual(Object.keys(params), Object.keys(defaultParams), 'the params contains all the keys including the alias')
    t.equals(params.input, defaultParams.input, 'the param input is the cobertura-coverage.xml')
    t.equals(params.output, defaultParams.output, 'the param output is console.log')
    t.equals(params.threshold_high, defaultParams.threshold_high, 'the param threshold_high is 95')
    t.equals(params.threshold_low, defaultParams.threshold_low, 'the param threshold_low is 65')

    // next()
  })
})

next()
