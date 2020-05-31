const nextTick = (func: (value: void) => void | PromiseLike<void>) =>
  Promise.resolve().then(func)

export default nextTick
