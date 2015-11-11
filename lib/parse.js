const xmldoc = require('xmldoc')

module.exports = parse = file => new xmldoc.XmlDocument(file)

