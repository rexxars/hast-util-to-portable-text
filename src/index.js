const minifyWhitespace = require('rehype-minify-whitespace')
const visitParents = require('unist-util-visit-parents')
const wrapTextNodes = require('./util/wrap-text-nodes')
const handlers = require('./handlers')
const flatten = require('./flatten')
const one = require('./one')

module.exports = function toPortableText(tree, options) {
  const settings = options || {}
  const minify = minifyWhitespace({newlines: settings.newlines === true})

  h.baseFound = false
  h.frozenBaseUrl = null

  h.handlers = {...handlers, ...(settings.handlers || {})}
  h.document = settings.document

  const root = Array.isArray(tree) ? tree : [tree]
  visitParents(tree, isList, (node, ancestors) => {
    const listDepth = ancestors.reduce((acc, el) => (isList(el) ? acc + 1 : acc), 1)
    const children = node.children || []
    node.children = children.filter(isListItem).map(applyListDepth(listDepth))
  })

  return root.reduce((nodes, node) => {
    const parsed = one(h, minify(node), null)
    const wrapped = wrapTextNodes(parsed)
    const flat = flatten(wrapped)
    return nodes.concat(flat)
  }, [])

  function h(node, type, properties, childNodes) {
    let children = childNodes
    let props = properties
    if (
      !children &&
      (typeof props === 'string' || (typeof props === 'object' && 'length' in props))
    ) {
      children = props
      props = {}
    }

    const result = {_type: type, ...props}

    if (typeof children === 'string') {
      result.value = children
    } else if (children) {
      result.children = children
    }

    return result
  }
}

function isList(el) {
  return el.tagName === 'ol' || el.tagName === 'ul'
}

function isListItem(el) {
  return el.tagName === 'li'
}

function applyListDepth(listDepth) {
  return item => ({...item, listDepth})
}
