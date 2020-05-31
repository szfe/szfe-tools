import * as url from './url'

export const parse = (str) => url.allParam(str)
export const stringify = (params = {}) =>
  url.generateParamStr(params).replace(/^.?/, '')

export default {
  parse,
  stringify,
}
