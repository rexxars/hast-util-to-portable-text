module.exports = all

const one = require('./one')

function all(h, parent) {
  const nodes = parent.children || []
  const length = nodes.length
  const values = []

  let index = -1
  let result
  while (++index < length) {
    result = one(h, nodes[index], parent)

    if (Array.isArray(result)) {
      values.push(...result)
    } else if (result) {
      values.push(result)
    }
  }

  return values
}
