export const generateMissingFieldMsg = (obj: object) => {
  const missingField = Object.entries(obj).find(([key, value]) => {
    return !value
  })
  return `${missingField?.[0]} is a required field`
}
