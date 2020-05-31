import debounce from './debounce'

type AnyFunction = (...args: any[]) => any

/**
 * [节流]
 * @param {Function} func 执行函数
 * @param {Number} wait 多少毫秒内运行一次
 */
const throttle = <T extends AnyFunction>(func: T, wait: number = 16) => {
  let locking = false

  const release = () => {
    locking = false
  }

  const debounced = debounce<T>(func, wait)

  return function (...args): ReturnType<T> | void {
    debounced.apply(this, args) // 确保最后一次会执行

    if (locking) {
      return
    }

    locking = true
    func.apply(this, args)
    setTimeout(release, wait)
  }
}

export default throttle
