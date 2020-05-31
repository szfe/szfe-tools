import isString from './isString'
import isUndefined from './isUndefined'
import isNumber from './isNumber'

export type KType = string | any[] | number

export default function get<T>(
  obj: any,
  keys: KType = [],
  defaultValue?: any
): T {
  try {
    if (isNumber(keys)) {
      keys = String(keys)
    }
    let result = (isString(keys)
      ? (keys as string).split('.')
      : (keys as any[])
    ).reduce((res, key) => res[key], obj)
    return isUndefined(result) ? defaultValue : result
  } catch (e) {
    return defaultValue
  }
}
