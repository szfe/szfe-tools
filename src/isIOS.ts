import get from './get'
import root from './globalThis'

const reg = /(iPhone|iPad|iPod|iOS)/i
const isIOS = (): boolean => reg.test(get(root, 'navigator.userAgent'))

export default isIOS
