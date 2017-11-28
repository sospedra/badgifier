'use strict'

const tape = require('tape')
const badgifier = require('../lib/')
const defaultParams = require('./fixtures/params')

tape('Can generate default parameters', (t) => {
  const params = badgifier.parameters(defaultParams)

  t.plan(4)

  t.equals(params.input, defaultParams.input, 'the param input is the clover.xml')
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

tape('Can generate shields', (t) => {
  const rate = 80
  const color = 'green'

  t.plan(1)

  t.equals(
    badgifier.shield(rate, color),
    `https://img.shields.io/badge/coverage-${rate}-${color}.svg`,
    'should generate a shield url'
  )
})

tape('Can select color', (t) => {
  const rate = 80

  t.plan(3)

  t.equals(badgifier.color({ tl: rate + 10 }, rate), 'red', 'should be able to select red color')
  t.equals(badgifier.color({ th: rate + 10 }, rate), 'yellow', 'should be able to select yellow color')
  t.equals(badgifier.color({}, 100), 'green', 'should be able to select green color')
})

tape('Can read and understand cobertura file', (t) => {
  t.plan(4)

  badgifier.read('./test/fixtures/clover.xml').then((file) => {
    t.pass('should read any file returning a promise')

    const xml = badgifier.parse(file)
    t.equals(typeof xml, 'object', 'should parse to a xml document')
    t.equals(typeof xml.attr, 'object', 'should parse the xml with an attr')

    const rate = badgifier.rate(xml)
    t.equals(rate, 75, 'should get the cobertura coverage rate form a parse xml doc')

    t.end()
  })
})

tape('Can keep the contract for insert', (t) => {
  const insertPromise = badgifier.insert()

  t.plan(1)

  // Let the insert fail gracefully
  insertPromise.catch(() => {})

  t.equals(typeof insertPromise.then, 'function', 'should return a Promise')
})
