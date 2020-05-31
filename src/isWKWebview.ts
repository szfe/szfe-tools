import get from './get'
import root from './globalThis'
import isIOS from './isIOS'
import isExist from './isExist'

const isWKWebview = (): boolean => isIOS() && isExist(get(root, 'webkit'))

export default isWKWebview
