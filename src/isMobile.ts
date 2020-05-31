import isDesktop from './isDesktop'
import isAndroid from './isAndroid'
import isIOS from './isIOS'

const isMobile = (): boolean => !isDesktop() && (isAndroid() || isIOS())

export default isMobile
