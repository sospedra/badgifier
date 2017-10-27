# Badgifier

[![Build Status](https://travis-ci.org/sospedra/badgifier.svg?branch=master)](https://travis-ci.org/sospedra/badgifier)
[![codecov](https://codecov.io/gh/sospedra/badgifier/branch/master/graph/badge.svg)](https://codecov.io/gh/sospedra/badgifier)
[![dependencies Status](https://david-dm.org/sospedra/badgifier/status.svg)](https://david-dm.org/sospedra/badgifier)
![code-style](https://img.shields.io/badge/code%20style-standard-green.svg)


## Generate your badges without third-parties services

### Why?

You want to just **plug and play** something to have a cool and very meaningful test coverage badge on your README. Or you have a **private repo** and don't want to integrate with any SaaS.

### What's supported?

Currently only `clover` reports. Working to bring all the standard reporters and even let you input your own.

### How?

The first time you need to add a placeholder on your destination file. Can be both markdown or HTML:

`![badgifier-cobertura]`

Then because Badgifier is a cli command just execute it:

`badgifier -i coverage/clover.xml -o README.md`

What params the cli accepts:

| option            | alias | default                 | description                 |
| ----------------- |------ | ----------------------- | --------------------------- |
| `format`          | `f`   | 'markdown'              | In which language your placeholder is (md or html) |
| `input`           | `i`   | './coverage/clover.xml' | From where to read coverage report             |
| `output`          | `o`   | `console.log`           | Where to send the badge                       |
| `rate`            | `r`   | (Internal)              | Which formula will use to calculate the value         |
| `threshold-high` | `th`   | 95                      | From which value is a green situation             |
| `threshold-low`  | `tl`   | 65                      | Until which value is a red situation                   |

## Contributing

Right now we're really interesting into knowing **which reporters will you want to be supported** out of the box. And also, **what's broken** when you use it. So, open as [many issues](https://github.com/sospedra/badgifier/issues/new) as you feel like 🕵🏽‍♀️

And, of course, any PR is more than welcome :P
