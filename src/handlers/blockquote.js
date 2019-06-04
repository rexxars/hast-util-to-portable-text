const all = require('../all')

module.exports = function blockquote(h, node) {
  return h(node, 'block', {style: 'blockquote'}, all(h, node))
}
