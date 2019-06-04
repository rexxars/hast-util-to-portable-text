const t = require('tap')
const mark = require('../src/mark')
const flatten = require('../src/flatten')
const {block, span, text} = require('./helpers/builders')

t.deepEqual(
  flatten(block([text('Very cool')])), // prettier, keep
  block([span('Very cool')]),
  'no marks'
)

t.deepEqual(
  flatten(block([mark.decorator('em', [text('Very cool')])])),
  block([span('Very cool', ['em'])]),
  'whole-span emphasis decorator'
)

t.deepEqual(
  flatten(
    block([
      text('Very '), // prettier, keep
      mark.decorator('em', [text('cool')])
    ])
  ),
  block([
    span('Very '), // prettier, keep
    span('cool', ['em'])
  ]),
  'part-span emphasis decorator'
)

t.deepEqual(
  flatten(
    block([
      text('Very '),
      mark.decorator('em', [
        text('em, '), // prettier, keep
        mark.decorator('strong', [text('nested strong')])
      ]),
      text('. Amaze.')
    ])
  ),
  block([
    span('Very '),
    span('em, ', ['em']),
    span('nested strong', ['em', 'strong']),
    span('. Amaze.')
  ]),
  'nested decorators'
)

t.deepEqual(
  flatten(
    block([
      text('Foo'),
      mark.decorator('em', [
        text('Sparkline: '),
        {_type: 'sparkline', _key: 'someKey', points: [0.11, 1.5, 2.88]},
        text(' - as you can see, the development is +++!')
      ])
    ])
  ),
  block([
    span('Foo'),
    span('Sparkline: ', ['em']),
    {_type: 'sparkline', _key: 'someKey', points: [0.11, 1.5, 2.88]},
    span(' - as you can see, the development is +++!', ['em'])
  ]),
  'Custom inline nodes'
)

t.deepEqual(
  flatten(
    block([
      text('We are converting from HTML to '),
      mark.annotation('link', [text('Portable Text')], {href: 'https://portabletext.org/'}),
      text('. The '),
      mark.annotation('link', [mark.decorator('em', [text('text')]), text(' part')], {
        href: 'https://portabletext.org/#text'
      }),
      text(' of the spec is the brunt of it.')
    ])
  ),
  block(
    {
      markDefs: [
        {_key: 'm4029420424070', _type: 'link', href: 'https://portabletext.org/'},
        {_key: 'm9714887069624', _type: 'link', href: 'https://portabletext.org/#text'}
      ]
    },
    [
      span('We are converting from HTML to '),
      span('Portable Text', ['m4029420424070']),
      span('. The '),
      span('text', ['m9714887069624', 'em']),
      span(' part', ['m9714887069624']),
      span(' of the spec is the brunt of it.')
    ]
  )
)
