const util = require('util')

function noPosition(item) {
  if (Array.isArray(item)) {
    return item.map(noPosition)
  }

  if (item === null || typeof item !== 'object') {
    return item
  }

  return Object.keys(item).reduce((acc, key) => {
    if (key === 'position') {
      return acc
    }

    acc[key] = noPosition(item[key])
    return acc
  }, {})
}

// eslint-disable-next-line no-console
module.exports = thing => console.log(util.inspect(noPosition(thing), {colors: true, depth: 10}))
