import run from '../../run'

import Thread, { ThreadConfig } from './Thread'

/**
 * 帧任务进程
 * 作用：为任务分配适宜线程，并控制线程任务总数，以保证执行性能
 */
export default class Process {
  static defaultProcess: Process = new Process()
  public maxTaskCount?: number
  threadList: Thread[] = []

  constructor(config: ThreadConfig = {}) {
    const { maxTaskCount } = config
    this.maxTaskCount = maxTaskCount
  }

  public getAvailableThread = (): Thread => {
    let thread = this.threadList.find((thread) => thread.isAvailable())

    if (!thread) {
      thread = new Thread({
        maxTaskCount: this.maxTaskCount,
      })
      this.threadList.push(thread)
    }

    return thread
  }

  public start = (frame: Function) => this.getAvailableThread().run(frame)
  public once = (frame: Function) => {
    const stop = this.start((...args: any[]) => {
      run(frame, undefined, ...args)
      stop()
    })
  }
}
