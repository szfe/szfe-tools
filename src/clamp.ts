/**
 * [钳子] 用来将数字限制在给定范围内
 * @param {Number} value 被限制值
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export default function clamp(
  value: number,
  min: number,
  max: number = Number.MAX_VALUE
): number {
  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value
}
