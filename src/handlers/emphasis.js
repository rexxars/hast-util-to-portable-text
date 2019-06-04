const all = require('../all')
const mark = require('../mark')

function emphasis(h, node) {
  return mark.decorator('em', all(h, node))
}

emphasis.isDecorator = true

module.exports = emphasis
