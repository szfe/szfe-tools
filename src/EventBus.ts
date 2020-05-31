import isFunction from './isFunction'
import isUndefined from './isUndefined'

interface Listener {
  [key: string]: Map<Function, Function>
}

export default class EventBus {
  private listeners: Listener = {}

  private getEventMap = (event: string): Map<Function, Function> => {
    if (!this.listeners[event]) {
      this.listeners[event] = new Map()
    }

    return this.listeners[event]
  }

  public on = (
    event: string,
    listener: Function,
    { once = false } = {}
  ): this => {
    if (!isFunction(listener)) {
      console.error('[EventBus Error] listener is not a function')
      return this
    }

    this.getEventMap(event).set(
      listener,
      once
        ? (...args: any[]) => {
            listener(...args)
            this.off(event, listener)
          }
        : listener
    )

    return this
  }

  public once = (event: string, listener: Function, config = {}): this =>
    this.on(event, listener, { ...config, once: true })

  public off = (event: string, listener: Function): this => {
    const eventMap = this.getEventMap(event)

    if (isUndefined(listener)) {
      eventMap.clear()
    } else {
      eventMap.delete(listener)
    }

    return this
  }

  public emit = (event: string, ...args: any[]): void =>
    this.getEventMap(event).forEach((listener) => listener(...args))
}
