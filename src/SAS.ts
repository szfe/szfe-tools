import lock from './lock'

/**
 * [单咨询服务] Single Advisory Service 同一时刻对同一异步请求进行统一等待，不重复发起
 * @param {Function} query 异步查询函数，需要返回 Promise
 */
const SAS = <T>(query: () => Promise<T>): (() => Promise<T>) => {
  const wrappedFunc = lock(function (...args) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const result = await query.apply(this, args)
        resolve(result)
      } catch (error) {
        reject(error)
      } finally {
        wrappedFunc.unlock()
      }
    })
  })

  return wrappedFunc as any
}

export default SAS
