export interface CachedFunction extends Function {
  cache: Map<any, any>
}

/**
 * [缓存函数结果]
 * @param {Function} func 被处理的函数
 */
const memoize = <T>(
  func: Function,
  { disable = () => false } = {}
): CachedFunction => {
  const cache = new Map()
  const memoizedFunc = function (key, ...rest): T {
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = func.call(this, key, ...rest)

    if (
      !disable.call(this, {
        cache,
        key,
        result,
        drop: () => cache.delete(key),
      })
    ) {
      cache.set(key, result)
    }

    return result
  }

  memoizedFunc.cache = cache
  return memoizedFunc
}

export default memoize
