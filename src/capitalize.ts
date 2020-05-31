import isString from './isString'

export default function capitalize(word: string): string {
  if (!isString(word)) {
    return ''
  }

  if (/\s/.test(word)) {
    return word.split(' ').map(capitalize).join(' ')
  }

  return word
    .split('')
    .map((letter, idx) => (idx === 0 ? letter.toUpperCase() : letter))
    .join('')
}
