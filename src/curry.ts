const curry = <T>(fn: Function) =>
  function (...args: any[]): T {
    return args.length < fn.length
      ? curry(fn.bind(this, ...args))
      : fn.apply(this, args)
  }

export default curry
