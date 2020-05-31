import root from './globalThis'
import isUndefined from './isUndefined'

const errorTypes = [
  'Error',
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
]
  .map((key) => root[key])
  .filter((type) => !isUndefined(type))

const isError = (value: any): boolean =>
  errorTypes.some((errorType) => value instanceof errorType)

export default isError
