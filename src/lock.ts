import memoize, { CachedFunction } from './memoize'
import run from './run'

export interface LockedFunction extends Function {
  unlock: () => void
  isLocked: () => boolean
}

export interface LockConfig {
  always?: Function
  locking?: Function
}

const memoizedFunction: CachedFunction = memoize(function (func, ...args) {
  return func.call(this, ...args)
})

/**
 * [自锁函数] 函数运行后会立即上锁，显式调用 fn.unlock 来解锁
 * 已上锁后，后续的函数调用将返回上锁时的调用结果
 * @param {Function} func 需要自锁的函数
 * @param {Function} conf.always 总是会调用
 * @param {Function} conf.locking 自锁时调用
 */
const lock = <T>(func, conf: LockConfig = {}): LockedFunction => {
  const { always, locking } = conf
  const unlock = () => memoizedFunction.cache.delete(func)
  const isLocked = () => memoizedFunction.cache.has(func)
  const lockedFunc = function (...args: any[]): T {
    run(always)

    if (isLocked()) {
      run(locking)
    }

    return memoizedFunction.call(this, func, ...args)
  }

  return Object.assign(lockedFunc, { unlock, isLocked })
}

lock.memory = memoizedFunction
export default lock
