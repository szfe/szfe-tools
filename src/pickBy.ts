import run from './run'
import isExist from './isExist'

const pickBy = (
  obj: Object,
  predicate: (...args: any[]) => boolean = (val) => isExist(val)
): Object =>
  Object.entries(obj)
    .filter(([key, value]) => run(predicate, undefined, value, key))
    .reduce(
      (res, [key, value]) => ({
        ...res,
        [key]: value,
      }),
      {}
    )

export default pickBy
