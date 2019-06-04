const all = require('../all')
const mark = require('../mark')

function strong(h, node) {
  return mark.decorator('strong', all(h, node))
}

strong.isDecorator = true

module.exports = strong
