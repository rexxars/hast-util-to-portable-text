module.exports = flatten

const hashIt = require('hash-it').default
const {TEXT, MARK} = require('./symbols')

const objectHash = input => `m${hashIt(input)}`

function flatten(block) {
  return Array.isArray(block) ? block.map(flattenBlock) : flattenBlock(block)
}

function flattenBlock(block) {
  if (!block || !Array.isArray(block.children)) {
    throw new Error('Invalid block encountered while flattening')
  }

  // Will be mutated during execution
  const markDefs = []
  const flattened = []

  flattenChildren(block.children)

  function flattenChildren(children, currentMarks = []) {
    const numChildren = children.length

    for (let i = 0; i < numChildren; i++) {
      const child = children[i]
      if (child._type === TEXT) {
        addSpan(child.value, currentMarks)
        continue
      }

      if (child._type === MARK) {
        const mark = child.props ? addMarkDef(child.props, child.type) : child.type
        flattenChildren(child.children, currentMarks.concat(mark))
        continue
      }

      // Other inline types (we expect disallowed nodes to be removed prior to this step)
      flattened.push(child)
    }
  }

  function addSpan(text, marks = []) {
    const currentNode = flattened[flattened.length - 1]
    const currentSpan = currentNode && currentNode._type === 'span' ? currentNode : false

    const hasSameMarks =
      currentSpan &&
      marks.length === currentSpan.marks.length &&
      marks.every(mark => currentSpan.marks.includes(mark))

    if (currentSpan && hasSameMarks) {
      currentSpan.text += text
    } else {
      flattened.push({_type: 'span', marks, text})
    }
  }

  function addMarkDef(markDef, _type) {
    const hash = objectHash(markDef)
    const mark = {_key: hash, _type, ...markDef}
    if (!markDefs.some(item => item._key === hash)) {
      markDefs.push(mark)
    }
    return hash
  }

  return {...block, markDefs, children: flattened}
}
