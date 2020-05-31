import random from './random'
import get from './get'

/**
 * [抽样] 随机获取数组中的一个值
 * @param {Array} array 抽样数组
 */
const sample = <T>(array: any[]): T =>
  get<T>(array, random(0, get(array, 'length', 0)))

export default sample
