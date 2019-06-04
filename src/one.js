module.exports = one

const own = {}.hasOwnProperty
const {TEXT} = require('./symbols')
const all = require('./all')

function one(h, node, parent) {
  let fn = null

  if (node.type === 'element') {
    if (own.call(h.handlers, node.tagName)) {
      fn = h.handlers[node.tagName]
    }
  } else if (own.call(h.handlers, node.type)) {
    fn = h.handlers[node.type]
  }

  const handler = typeof fn === 'function' ? fn : unknown
  return handler(h, node, parent)
}

function unknown(h, node) {
  if (node.value) {
    return {_type: TEXT, value: node.value}
  }

  return all(h, node)
}
