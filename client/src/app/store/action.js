export function createActionMap(actions, prefix) {
  return _.mapValues(actions, (value, key) => (prefix ? prefix + '/' : '') + key)
}
