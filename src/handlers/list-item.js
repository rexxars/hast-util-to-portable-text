module.exports = item

const all = require('../all')

function item(h, node, parent) {
  const ordered = parent && parent.tagName === 'ol'
  const listItem = ordered ? 'number' : 'bullet'
  const nodes = all(h, node)

  let batch = []
  const unwrapped = []
  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i]
    if (child._type !== 'block') {
      batch.push(child)
      continue
    }

    addBatch()

    // Hoist blocks up to root
    unwrapped.push(child)
  }

  // In case there are remaining elements unaccounted for, add those too
  addBatch()

  function addBatch() {
    if (batch.length === 0) {
      return
    }

    unwrapped.push(
      h(
        node,
        'block',
        {
          style: 'normal',
          listItem,
          markDefs: [],
          level: node.listDepth
        },
        batch
      )
    )
    batch = []
  }

  return unwrapped
}
