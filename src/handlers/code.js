const all = require('../all')

module.exports = function code(h, node) {
  return h(node, 'block', {style: 'pre'}, all(h, node))
}
