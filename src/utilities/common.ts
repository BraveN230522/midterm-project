export const dataMappingSuccess = (
  data:
    | {
        [key: string]: any
      }
    | Array<any>
) => {
  return { data, message: 'Success' }
}

export const dataMapping = (
  data:
    | {
        [key: string]: any
      }
    | Array<any>
) => {
  return { data }
}
