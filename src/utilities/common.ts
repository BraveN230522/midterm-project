import _ from 'lodash'

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

export const findObjectById = ({ arr, id }: { arr: Array<any>; id: String }) => {
  return _.find(arr, (item) => item.id === id)
}
