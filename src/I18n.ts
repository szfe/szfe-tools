import get from './get'
import run from './run'
import isArray from './isArray'
import isObject from './isObject'
import isFunction from './isFunction'
import memoize from './memoize'
import EventBus from './EventBus'

const NSReg = /:/

export interface I18nConfig {
  types: {
    resources: Object
  }[]
  defaultType: string
  fallback?: I18n[] | Object
}

export default class I18n {
  static instances = []
  static language = undefined
  static eventBus = new EventBus()
  /**
   * [template 简易字符串模板函数]
   * e.g: template('hello {{name}}', { name: 'CJY' }) ==> 'hello CJY'
   * @param  {[字符串]} str  [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  static template = (str = '', data) => {
    const exp = /\{\{\s*\w*\s*\}\}/g,
      keys = str.match(exp) || {}

    Object.keys(keys).forEach((_k) => {
      const key = keys[_k].replace(/\{\{\s*/, '').replace(/\s*\}\}/, '')
      str = str.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), get(data, key))
    })

    return str
  }
  static load = (...loaders) =>
    memoize(async () =>
      Object.assign(
        {},
        ...(await Promise.all(
          loaders.map(async (loader) => {
            const res = await run(loader)

            return get(res, 'default', res)
          })
        ))
      )
    )
  static applyLanguage = async (language) => {
    if (!language) {
      return
    }
    await Promise.all(
      I18n.instances.map((instance) => instance.applyLanguage(language))
    )

    I18n.language = language
    I18n.eventBus.emit('change', language)
  }

  resources = {}
  language = undefined
  eventBus = new EventBus()
  config: I18nConfig

  constructor(config: I18nConfig) {
    this.config = config

    I18n.instances.push(this)
    if (I18n.language) {
      this.applyLanguage(I18n.language)
    } else {
      I18n.eventBus.once('change', (language) => {
        this.applyLanguage(I18n.language)
      })
    }
  }

  applyLanguage = async (language) => {
    if (!language) {
      return
    }

    await Promise.all(
      Object.entries(this.config.types).map(async ([type, { resources }]) => {
        if (!this.resources[type]) {
          this.resources[type] = {}
        }
        this.resources[type][language] = await run(
          get(resources, language, resources)
        )
      })
    )
    this.language = language
    this.eventBus.emit('change', language)
  }

  translate = (str, options = {}) => {
    const useNamespace = NSReg.test(str)
    const [_keys, type = this.config.defaultType || 'default'] = str.split('@')

    let keys = _keys
    let namespace

    if (useNamespace) {
      ;[namespace, keys] = _keys.split(':')
    }

    if (!useNamespace && this.language) {
      const format = get(
        this.config,
        `types.${type}.format.${this.language}`,
        get(this.config, `types.${type}.format`, I18n.template)
      )
      const useResource =
        get(this.resources, `${type}.${this.language}`) !== false

      if (isFunction(format)) {
        const res = run(
          format,
          undefined,
          useResource
            ? get(this.resources, `${type}.${this.language}.${keys}`)
            : keys,
          options
        )

        if (res) {
          return res
        }
      }
    }

    return this.fallbackTranslate(`${keys}@${type}`, options, namespace) || keys
  }

  fallbackTranslate = (str, options, namespace) => {
    if (!isArray(this.config.fallback) && !isObject(this.config.fallback)) {
      return undefined
    }

    const fallbackOptions = {
      ...options,
      _fbT: true,
    }

    if (namespace) {
      const res = run(
        this.config.fallback,
        `${namespace}.t`,
        str,
        fallbackOptions
      )

      if (res) {
        return res
      }
    } else {
      for (let i18n of Object.values(this.config.fallback)) {
        let res = i18n.t(str, fallbackOptions)

        if (res) {
          return res
        }
      }
    }

    if (options._fbT) {
      return undefined
    }
  }

  t = this.translate
}
