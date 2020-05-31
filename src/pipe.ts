import run from './run'

const pipe = <T>(...handlers: Function[]) => (arg: any): T =>
  handlers.reduce((res, handler) => run(handler, undefined, res), arg)

export default pipe
