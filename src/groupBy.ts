import get from './get'

const groupBy = (namer: Function, list: any[]): Object =>
  list.reduce((res, item, ...args) => {
    const groupName = String(namer(item, ...args))
    const group = get<any[]>(res, groupName, [])

    return {
      ...res,
      [groupName]: [...group, item],
    }
  }, {})

export default groupBy
