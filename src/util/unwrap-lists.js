module.exports = unwrapLists

const {LIST} = require('../symbols')

function unwrapLists(tree, depth = 1) {
  return tree.reduce((nodes, node) => {
    if (node._type === LIST) {
      return nodes.concat(node.children)
    }

    if (Array.isArray(node.children)) {
      node.children = unwrapLists(node.children, depth + 1)
      return nodes.concat(node)
    }

    return nodes
  }, [])
}
