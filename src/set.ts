import isString from './isString'
import isObject from './isObject'
import isArray from './isArray'
import get, { KType } from './get'

const set = (obj: Object = {}, keys: KType = [], value): Object => {
  obj = Object.assign({}, obj)
  keys = isString(keys) ? (keys as string).split('.') : keys
  ;(keys as any[]).reduce((res, key, idx) => {
    let next = idx === (keys as string).length - 1 ? value : get(res, key, {})

    if (isObject(next)) {
      next = Object.assign({}, next)
    }

    if (isArray(next)) {
      next = next.slice()
    }

    res[key] = next

    return res[key]
  }, obj)

  return obj
}

export default set
