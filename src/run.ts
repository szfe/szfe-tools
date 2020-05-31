import isString from './isString'
import isFunction from './isFunction'
import get, { KType } from './get'

const run = <T>(obj: any, keys: KType = [], ...args: any[]): T => {
  keys = isString(keys) ? (keys as string).split('.') : keys

  const func = get<Function | any>(obj, keys)
  const context = get<any>(obj, (keys as any[]).slice(0, -1))

  return isFunction(func) ? (func as Function).call(context, ...args) : func
}

export default run
