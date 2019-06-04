module.exports = function wbr(h, node) {
  return h(node, 'span', {text: '\u200B'})
}
