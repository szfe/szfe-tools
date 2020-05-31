/**
 * [随机函数] 获取 (min, max) 之间的一个随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
const random = (min: number, max: number, int: boolean = true): number => {
  const value = Math.random() * (max - min) + min

  return int ? Math.floor(value) : value
}

export default random
