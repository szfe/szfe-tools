import isUndefined from './isUndefined'
import isNull from './isNull'

const isExist = (value: any): boolean => !(isUndefined(value) || isNull(value))

export default isExist
