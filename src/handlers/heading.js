const all = require('../all')

module.exports = function heading(h, node) {
  const depth = Number(node.tagName.charAt(1))

  return h(node, 'block', {style: `h${depth}`}, all(h, node))
}
