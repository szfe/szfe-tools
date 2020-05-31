import isNaN from './isNaN'

const isNumber = (value: any): boolean =>
  typeof value === 'number' && !isNaN(value)

export default isNumber
