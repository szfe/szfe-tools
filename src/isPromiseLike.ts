import isExist from './isExist'
import isFunction from './isFunction'

const isPromiseLike = (value: any): boolean =>
  isExist(value) && isFunction(value.then)

export default isPromiseLike
