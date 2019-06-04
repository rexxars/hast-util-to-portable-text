const {TEXT, MARK} = require('../symbols')

module.exports = wrapTextNodes

function wrapTextNodes(tree) {
  return tree.map(node => {
    switch (node._type) {
      case TEXT:
      case MARK:
        return {_type: 'block', style: 'normal', markDefs: [], children: [node]}
      default:
        return node
    }
  })
}
