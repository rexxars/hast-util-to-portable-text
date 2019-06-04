const {TEXT} = require('../../src/symbols')

exports.block = function block(opts, childNodes) {
  let options = opts || {}
  let children = childNodes || []
  if (Array.isArray(options)) {
    children = options
    options = {}
  }

  return {
    _type: 'block',
    style: options.style || 'normal',
    markDefs: options.markDefs || [],
    children
  }
}

exports.span = function span(text, marks = []) {
  return {
    _type: 'span',
    text,
    marks
  }
}

exports.text = function text(value) {
  return {_type: TEXT, value}
}
