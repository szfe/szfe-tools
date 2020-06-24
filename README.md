# SZFE Tools 辅助函数库

## 安装

```bash
yarn add szfe-tools
# 或者
npm install szfe-tools
```

## 用法示例

```js
import { isArray } from 'szfe-tools'
```

## 按需加载

配合 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 实现按需加载，需将 `camel2DashComponentName` 配置关闭

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'szfe-tools',
        camel2DashComponentName: false,
      },
    ],
  ],
}
```

## 导出的方法有以下

```javascript
export {
  CombJudge, // 组合判断器
  EventBus, // EventBus
  FrameProcess, // 帧进程，用于制作动画
  I18n, // i18nshell 工具原型，多语言工具包
  SAS, // [单咨询服务] Single Advisory Service 同一时刻对同一异步请求进行统一等待，不重复发起
  ScrollListener, // 滚动监听
  Tween, // 缓动函数工具
  __, // 自由柯里化
  capitalize, // 首字母大写
  clamp, // 数值范围限定
  classnames, // classnames 库的自实现
  copy, // 复制粘贴
  curry, // 柯里化
  debounce, // 防抖
  delay, // 延时 Promise
  first, // 取首个值，可用于对象或数组
  flatten, // 数组拍平
  get, // 无痛取值，同 ?. 算符
  getFormatter, // 格式化工具
  globalThis, // globalThis
  groupBy, // 对数组进行归类处理
  intersection, // 交集
  isAndroid, // 是否安卓环境
  isArray, // 是否数组
  isBoolean, // 是否 Boolean
  isDate, // 是否日期类型
  isDesktop, // 是否桌面端（PC）
  isError, // 是否错误类型
  isExist, // 是否存在（非 undefined / null）
  isFunction, // 是否函数类型
  isIOS, // 是否 iOS 环境
  isMobile, // 是否移动端
  isNaN, // 是否 NaN
  isNull, // 是否 Null
  isNumber, // 是否数字类型
  isObject, // 是否对象（Array 不算）
  isPromiseLike, // 是否 PromiseLike
  isString, // 是否字符串
  isUndefined, // 是否 undefined
  isWKWebview, // 是否 WKWebview 环境
  last, // 取首末尾，可用于对象或数组
  lock, // 自锁函数
  memoize, // 记忆函数
  nextTick, // nextTick 的客户端实现
  pick, // 选值函数
  pickBy, // 自定义选值函数
  pipe, // 管道函数，同 |> 算符
  preloadImage, // 预渲染指定图片
  promiseGuess, // 智能处理 Promise 类型返回值
  qs, // qs 库简易实现
  random, // 随机函数
  run, // 无痛运行
  sample, // 样本函数
  set, // 无痛属性设置
  source, // 在线资源加载
  storage, // storage 存取
  throttle, // 节流
  uniqByKey, // 去重
  url, // url 参数取值
  value, // 值选择，同 ?? 算符
}
```
