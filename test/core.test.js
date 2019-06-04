const {test} = require('tap')
const u = require('unist-builder')
const h = require('hastscript')
const {block, span} = require('./helpers/builders')
const pt = require('../src')

test('core', t => {
  t.deepEqual(
    pt([u('root', [h('strong', 'Eych Tee Emm Ehl')])]),
    [block([span('Eych Tee Emm Ehl')])],
    'wraps phrasing nodes in block'
  )
})
