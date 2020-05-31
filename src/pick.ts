import pickBy from './pickBy'

/**
 * [过滤对象属性] 挑选处一个对象中的指定属性
 * @param {Object} obj 数据源对象
 * @param {Array} keys
 */
const pick = (obj: Object, keys: any[] = Object.keys(obj)) =>
  pickBy(obj, (value, key) => keys.includes(key))

export default pick
