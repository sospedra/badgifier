'use strict'

const tape = require('tape')
const fs = require('fs')
const path = require('path')
const badgifier = require('../lib/')
const files = require('./fixtures/files')

const DIR_NAME = path.resolve('./test/tmp')
const FILE_NAME = path.resolve(DIR_NAME + '/file.md')
const useInsert = (t, format, file) => {
  const SHIELD = 'https://img.shields.io/badge/coverage-99-green.svg'
  const content = file || files[format]

  fs.writeFile(FILE_NAME, content, 'utf8', (err) => {
    if (err) return t.fail(err)

    badgifier
      .insert(FILE_NAME, SHIELD, format)
      .then((content) => {
        t.pass('should read and write the file')
        t.equals(content.indexOf(SHIELD) !== -1, true, 'should modify the shield badge')
      })
      .catch(t.fail)
  })
}

// @FIXME Can use mkdtmp?
fs.mkdir(DIR_NAME)

tape('Can read and write Markdown files', (t) => {
  t.plan(2)
  useInsert(t, 'markdown')
})

tape('Can read and write HTML files', (t) => {
  t.plan(2)
  useInsert(t, 'html')
})

tape('Can read and write Mixed files', (t) => {
  t.plan(2)
  useInsert(t, 'html', files.mixed)
})

// @FIXME Can use mkdtmp?
tape.onFinish(() => {
  fs.unlink(FILE_NAME, console.error)
  fs.rmdir(DIR_NAME, console.error)
})
