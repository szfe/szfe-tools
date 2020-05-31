import isArray from './isArray'
import isObject from './isObject'

/**
 * [返回数组或对象的首个值]
 * @param {Array / Object} value 源集合
 */
const first = <T>(value: any[] | Object): T => {
  if (isArray(value)) {
    return value[0]
  }

  if (isObject(value)) {
    const keys = Object.keys(value)
    return value[first<string>(keys)]
  }

  return undefined
}

export default first
