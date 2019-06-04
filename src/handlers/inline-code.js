const all = require('../all')
const mark = require('../mark')

module.exports = function code(h, node) {
  return mark.decorator('code', all(h, node))
}
