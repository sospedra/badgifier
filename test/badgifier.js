'use strict'

const tape = require('tape')
const badgifier = require('../lib/')

const fixtures = {
  params: require('./fixtures/params')
}

tape('Can generate default parameters', (t) => {
  t.plan(4)

  const params = badgifier.parameters()
  const defaultParams = fixtures.params.default

  t.equals(params.input, defaultParams.input, 'the param input is the cobertura-coverage.xml')
  t.equals(params.output, defaultParams.output, 'the param output is console.log')
  t.equals(params['threshold-high'], defaultParams['threshold-high'], 'the param threshold-high is 95')
  t.equals(params['threshold-low'], defaultParams['threshold-low'], 'the param threshold-low is 65')
})

tape('Can guard params', (t) => {
  const guard = badgifier.guard

  t.plan(11)

  t.throws(guard.format, 'should throw format error')
  t.doesNotThrow(guard.format.bind(null, 'html'), 'should accept format html')
  t.doesNotThrow(guard.format.bind(null, 'markdown'), 'should accept format markdown')

  t.throws(guard.input.bind(null, 'NOT_A_FILE'), 'should throw input error')
  t.doesNotThrow(guard.input.bind(null, './test/badgifier.js'), 'should input accept readable files')

  t.throws(guard.rate.bind(null, 'NOT_A_FILE'), 'should throw rate error')
  t.doesNotThrow(guard.rate.bind(null, './test/badgifier.js'), 'should rate accept readable files')

  t.throws(guard.threshold.bind(null, ''), 'should throw threshold error')
  t.throws(guard.threshold.bind(null, 40, '100'), 'should threshold throw error if not integer')
  t.throws(guard.threshold.bind(null, 100, 80), 'should threshold throw range error if lowe is higher')
  t.doesNotThrow(guard.threshold.bind(null, 20, 100), 'should threshold accept a natural range of integers')
})
