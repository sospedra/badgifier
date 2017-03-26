'use strict'

const tape = require('tape')
const badgifier = require('../lib/')

const fixtures = {
  params: require('./fixtures/params')
}
const tests = []
const next = () => tests.shift()()

tests.push(() => {
  tape('Can generate default parameters', (t) => {
    t.plan(5)

    const params = badgifier.parameters()
    const defaultParams = fixtures.params.default

    t.deepLooseEqual(Object.keys(params), Object.keys(defaultParams), 'the params contains all the keys including the alias')
    t.equals(params.input, defaultParams.input, 'the param input is the cobertura-coverage.xml')
    t.equals(params.output, defaultParams.output, 'the param output is console.log')
    t.equals(params['threshold-high'], defaultParams['threshold-high'], 'the param threshold-high is 95')
    t.equals(params['threshold-low'], defaultParams['threshold-low'], 'the param threshold-low is 65')
  })
})

next()
