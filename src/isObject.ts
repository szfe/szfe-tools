import isArray from './isArray'
import isNull from './isNull'

const isObject = (value: any): boolean =>
  typeof value === 'object' && !(isArray(value) || isNull(value))

export default isObject
