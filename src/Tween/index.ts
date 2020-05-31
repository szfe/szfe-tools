import { defaultProcess as tweenFrameProcess } from '../FrameProcess'
import EventBus from '../EventBus'
import clamp from '../clamp'
import pickBy from '../pickBy'
import run from '../run'
import isFunction from '../isFunction'
import isExist from '../isExist'

import easing, { EasingFunctionMap } from './easing'

interface Config {
  from: number
  to: number
  duration: number
  ease: string | Function
  loop: boolean
}

const DEFAULT_CONFIG = {
  from: 0,
  to: 1,
  duration: 1000,
  ease: 'linear',
  loop: false,
}

export default class Tween {
  static easing: EasingFunctionMap = easing
  static DEFAULT_CONFIG = DEFAULT_CONFIG

  private stopRunningFrame?: Function

  bus = new EventBus()
  state = {
    reversed: false,
    progress: 0,
    stoped: true,
    config: DEFAULT_CONFIG,
  }

  constructor(config = DEFAULT_CONFIG) {
    this.config(config)
  }

  on = (event: string, listeners: Function, ...args: any[]): this => {
    this.bus.on(event, listeners, ...args)
    return this
  }

  off = (event: string, listeners: Function): this => {
    this.bus.off(event, listeners)
    return this
  }

  config = (config = DEFAULT_CONFIG): this => {
    this.state.config = {
      ...DEFAULT_CONFIG,
      ...this.state.config,
      ...pickBy(config, isExist),
    }

    return this
  }

  start = (): this => {
    if (this.isEnded() || !this.state.stoped) {
      return this
    }

    this.state.stoped = false
    this.bus.emit('start')

    let prevFrameTime = Date.now()

    this.stopRunningFrame = tweenFrameProcess.start(({ frameTime }) => {
      const frameProgress =
        (frameTime - prevFrameTime) / clamp(this.state.config.duration, 16)
      const direction = this.state.reversed ? -1 : 1

      this.progress(this.state.progress + frameProgress * direction)
      prevFrameTime = frameTime
    })

    return this
  }

  restart = (): this => this.reset().start()

  reset = (): this => {
    const { reversed } = this.state

    return this.stop().progress(reversed ? 1 : 0)
  }

  stop = (): this => {
    if (this.state.stoped) {
      return this
    }

    this.state.stoped = true
    run(this.stopRunningFrame)
    this.bus.emit('stop')

    return this
  }

  reverse = (): this => {
    this.state.reversed = !this.state.reversed
    this.bus.emit('reverse')

    return this
  }

  progress = (progress: number): this => {
    const preProgress = this.state.progress
    this.state.progress = clamp(progress, 0, 1)

    this.bus.emit('update', this.value(progress), this.value(preProgress))

    if (this.isEnded()) {
      if (this.state.config.loop) {
        this.state.reversed = !this.state.reversed
      } else {
        this.stop()
        this.bus.emit('end')
      }
    }

    return this
  }

  value = (progress = this.state.progress) => {
    progress = clamp(progress, 0, 1)
    const { config } = this.state
    const { ease, to, from } = config
    const easeFn = isFunction(ease) ? ease : easing[ease]

    return (to - from) * (easeFn as Function)(progress) + from
  }

  isEnded = (progress = this.state.progress) => {
    const { reversed } = this.state

    return reversed ? progress <= 0 : progress >= 1
  }
}
