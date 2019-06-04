const all = require('../all')
const mark = require('../mark')

module.exports = function strikeThrough(h, node) {
  return mark.decorator('strike-through', all(h, node))
}
