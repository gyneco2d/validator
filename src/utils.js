/**
 * Convert Regex String to RegExp.
 *
 * @param {string} string is regex string.
 * @return {RegExp} converted RegExp.
 */
export const regexpFrom = string => {
  if (string.indexOf('/') !== 0) {
    return new RegExp(string)
  }

  const flags = string.slice(string.lastIndexOf('/') + 1)
  const pattern = string.slice(0, string.lastIndexOf('/')).slice(1)

  return new RegExp(pattern, flags)
}
