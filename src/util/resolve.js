module.exports = function resolve(h, url) {
  if (url === null || url === undefined) {
    return ''
  }

  if (h.frozenBaseUrl && typeof URL !== 'undefined') {
    return new URL(url, h.frozenBaseUrl).toString()
  }

  return url
}
