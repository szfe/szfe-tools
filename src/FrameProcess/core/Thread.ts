import run from '../../run'
import root from '../../globalThis'

const { requestAnimationFrame } = root

export interface ThreadConfig {
  maxTaskCount?: number
}

export interface Task {
  frame: Function
  startTime: number
}

export default class Thread {
  public maxTaskCount: number

  constructor({ maxTaskCount = 20 }: ThreadConfig = {}) {
    this.maxTaskCount = maxTaskCount
  }

  taskList: Set<Task> = new Set()

  public isAvailable = (): boolean => this.taskList.size >= this.maxTaskCount

  //进程是否正在工作：进程工作过程中若插入新的任务，不会影响目前的工作流程
  public isRunning: boolean = false

  //帧函数
  private frame = (): void => {
    const frameTime = Date.now()

    //执行任务帧
    this.taskList.forEach(({ frame, startTime }) =>
      run(frame, undefined, {
        runningTime: frameTime - startTime,
        startTime,
        frameTime,
      })
    )

    //若有未结束任务，则继续下一帧
    if (this.taskList.size > 0) {
      requestAnimationFrame(this.frame)
    } else {
      this.isRunning = false
    }
  }

  public run = (frame: Function): Function => {
    const task: Task = {
      startTime: Date.now(),
      frame,
    }

    this.taskList.add(task)

    if (!this.isRunning) {
      requestAnimationFrame(() => {
        this.isRunning = true
        this.frame()
      })
    }

    return () => this.taskList.delete(task)
  }
}
