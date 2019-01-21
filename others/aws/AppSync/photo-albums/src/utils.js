// Function we can use to sort an array of objects by a common property
export const makeComparator = (key, order = 'asc') => (a, b) => {
  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0

  const aVal = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
  const bVal = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

  let comparison = 0
  if (aVal > bVal) comparison = 1
  if (aVal < bVal) comparison = -1

  return order === 'desc' ? comparison * -1 : comparison
}
