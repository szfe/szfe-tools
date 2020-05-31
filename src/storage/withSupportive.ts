import isExist from '../isExist'

let isStorageSupported = true

const TEST_KET = '__testSupportive__'
const storage = window.localStorage

if (!isExist(storage)) {
  isStorageSupported = false
}

try {
  storage.setItem(TEST_KET, '__testSupportive__')
  storage.removeItem(TEST_KET)
} catch (err) {
  isStorageSupported = false
}

export default function withSupportive(func: Function): Function {
  if (!isStorageSupported) {
    return () => console.warn('Storage unsupported')
  }

  return func
}
