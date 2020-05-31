import isArray from './isArray'
import isObject from './isObject'

/**
 * [返回数组或对象的末尾值]
 * @param {Array / Object} value 源集合
 */
const last = <T>(value: any[] | Object): T => {
  if (isArray(value)) {
    return value[(value as any[]).length - 1]
  }

  if (isObject(value)) {
    const keys = Object.keys(value)
    return value[last<string>(keys)]
  }

  return undefined
}

export default last
