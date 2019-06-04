module.exports = wrapped

const all = require('../all')
const wrap = require('./wrap')

function wrapped(h, node) {
  return wrap(all(h, node))
}
