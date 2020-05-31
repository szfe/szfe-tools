import isArray from './isArray'

const flatten = <T>(array: any[]): T[] =>
  array.reduce(
    (res, item) => [...res, ...(isArray(item) ? flatten(item) : [item])],
    []
  )

export default flatten
