import isNull from '../isNull'
import root from '../globalThis'

import withSupportive from './withSupportive'

const getter = (storage: Storage) =>
  withSupportive((key: string) => {
    let data = storage.getItem(key)
    let result

    if (data === 'undefined' || isNull(data)) {
      result = undefined
    } else {
      try {
        result = JSON.parse(data as string)
      } catch (err) {
        console.error('[ERROR storage.get --> JSON.parse]', err)
        result = data
      }
    }

    return result
  })

const setter = (storage: Storage) =>
  withSupportive((key: string, value: any) => {
    let data

    try {
      data = JSON.stringify(value)
    } catch (err) {
      console.error('[ERROR storage.set --> JSON.stringify]', err)
      data = value
    }

    storage.setItem(key, data)

    return data
  })

const remover = (storage: Storage) =>
  withSupportive((key: string) => {
    storage.removeItem(key)
  })

export const get = getter(root.localStorage)
export const set = setter(root.localStorage)
export const remove = remover(root.localStorage)

export const getSession = getter(root.sessionStorage)
export const setSession = setter(root.sessionStorage)
export const removeSession = remover(root.sessionStorage)

export default {
  get,
  set,
  remove,
  getSession,
  setSession,
  removeSession,
}
