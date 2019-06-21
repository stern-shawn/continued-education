export const dateStringToDate = (dateString: string): Date => {
  // ['28', '10', '2018'] for example
  const dateParts = dateString.split('/').map(value => parseInt(value))
  // Remember that months are 0 indexed, so - 1
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
}
