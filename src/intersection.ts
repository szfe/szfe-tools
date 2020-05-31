import pipe from './pipe'
import flatten from './flatten'

/**
 * [交集]
 * 示例：intersection([1, 2], [2, 3]) => [2]
 */
const intersection = (...args) =>
  pipe<any[]>(
    flatten,
    (_: any[]) => new Set(_),
    Array.from
  )(args).filter((item) => args.every((arr) => arr.includes(item)))

export default intersection
