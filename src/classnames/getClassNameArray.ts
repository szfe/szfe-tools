import isObject from '../isObject'
import isArray from '../isArray'
import isString from '../isString'
import flatten from '../flatten'

const mapObjectClassName = (obj: Object): string[] =>
  Object.entries(obj)
    .filter(([, value]) => !!value)
    .map(([key]) => key)

const parseClassName = (className: string): string | string[] =>
  /\s/.test(className) ? className.trim().split(' ') : className

const getClassNameArray = (...args: any[]): string[] =>
  flatten(
    args
      .filter((arg) => !!arg)
      .map((arg) => {
        if (isObject(arg)) {
          return mapObjectClassName(arg)
        }

        if (isArray(arg)) {
          return getClassNameArray(...arg)
        }

        if (isString(arg)) {
          return parseClassName(arg)
        }

        return String(arg)
      })
  )

export default getClassNameArray
