const all = require('../all')

module.exports = function paragraph(h, node) {
  const children = node.children
  const nodes = all(h, node)

  if (children && children.length !== 0 && nodes.length === 0) {
    return undefined
  }

  return h(node, 'block', {style: 'normal', markDefs: []}, nodes)
}
