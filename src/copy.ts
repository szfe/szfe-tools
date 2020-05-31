import isUndefined from './isUndefined'

/**
 * [复制] 尝试通过 web 本身实现复制功能
 * @param {String / Number} value 要复制的值
 */
const copy = (value: string | number): void => {
  if (isUndefined(document)) {
    return console.warn('宿主环境不存在 DOM 对象，无法执行复制操作')
  }

  const input = document.createElement('input')

  input.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0;
  `
  document.body.appendChild(input)

  input.setAttribute('value', value as string)
  // input.setAttribute('readonly', false)

  // execCommand 执行 copy 命令时，页面中需要有一段被选中的文本，此处借用 input 来实现 js 选中文本功能
  input.select()
  input.setSelectionRange(0, 9999)

  if (document.execCommand('copy', true)) {
    document.execCommand('copy', true) // 核心这一句
  }

  document.body.removeChild(input)
}

export default copy
