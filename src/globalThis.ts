/* ts-ignore */
const getImplementation = () => {
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof self !== 'undefined') {
    return self
  }
  // @ts-ignore
  if (typeof global !== 'undefined') {
    // @ts-ignore
    return global
  }

  return Function('return this')()
}

const implementation = getImplementation()

const getGlobal = () => {
  if (
    // @ts-ignore
    typeof global !== 'object' ||
    // @ts-ignore
    !global ||
    // @ts-ignore
    global.Math !== Math ||
    // @ts-ignore
    global.Array !== Array
  ) {
    return implementation
  }
  // @ts-ignore
  return global
  // return implementation
}

const globalThis = getGlobal()

export default globalThis
