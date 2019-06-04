const {MARK} = require('./symbols')

// Temporary AST node, will be flattened
function markIt(isDecorator, type, children, props) {
  const node = {_type: MARK, type, children, isDecorator}
  if (typeof props !== 'undefined') {
    node.props = props
  }
  return node
}

module.exports = {
  decorator: markIt.bind(null, true),
  annotation: markIt.bind(null, false)
}
