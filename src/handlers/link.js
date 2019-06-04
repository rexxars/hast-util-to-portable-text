const all = require('../all')
const mark = require('../mark')
const resolve = require('../util/resolve')

module.exports = function link(h, node) {
  const props = {href: resolve(h, node.properties.href)}
  return mark.annotation('link', all(h, node), props)
}
