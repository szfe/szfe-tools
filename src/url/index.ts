import isNull from '../isNull'
import get from '../get'
import run from '../run'
import root from '../globalThis'
import __ from '../__'

const safeDecode = (value: any) => {
  const decoders = [root.decodeURIComponent, root.decodeURI, root.unescape]

  for (let decode of decoders) {
    try {
      return decode(value)
    } catch (error) {
      continue
    }
  }

  return value
}

export const paramEscape = __(param)(__, __, root.unescape)
export function param(
  name: string,
  url = root.location.search,
  decode = safeDecode
) {
  let res = get<string>(run(url, 'split', '?'), '1', '').match(
    new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  )

  return isNull(res) ? undefined : decode((res as RegExpMatchArray)[2])
}

export const allParamEscape = __(allParam)(__, root.unescape)
export function allParam(url = root.location.search, decode = safeDecode) {
  const search = get<string>(url.split('?'), [1], '')

  if (search.length === 0) {
    return {}
  }

  return search
    .split('&')
    .map((param) => param.split('='))
    .reduce(
      (res, [key, value]) =>
        Object.assign(res, {
          [key]: decode(value),
        }),
      {}
    )
}

export function generateParamStr(
  paramObj: Object,
  encode: Function = root.encodeURIComponent
) {
  return `?${Object.entries(paramObj)
    .map(([key, value]) => [key, encode(value)].join('='))
    .join('&')}`
}

export default {
  paramEscape,
  param,
  allParamEscape,
  allParam,
  generateParamStr,
}
