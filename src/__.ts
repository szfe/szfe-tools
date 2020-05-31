type AnyFunction = (...args: any[]) => any

const __ = <T extends AnyFunction>(func: T, context?: any) => {
  return (...preArgs: any[]) =>
    function (...args: any[]): ReturnType<T> {
      return func.apply(
        context || this,
        preArgs
          .map((preArg) => (preArg === __ ? args.shift() : preArg))
          .concat(args)
      )
    }
}

export default __
