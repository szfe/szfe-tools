import isFunction from './isFunction'

export interface DistanceEventType {
  distance: number | Function
  onGoingIn?: Function
  onGoningOut: Function
  dynamic?: boolean
}

const OUTSIDE = 'OUTSIDE'
const INSIDE = 'INSIDE'
const DIRECTION_FORWARD = 1
const DIRECTION_BACKWARD = -1
const SCROLL_EVENT_NAME = 'scroll'
const getEventDistance = (event: DistanceEventType) =>
  isFunction(event.distance) ? (event.distance as Function)() : event.distance

/**
 * 默认使用 requestAnimationFrame 优化 scroll 监听
 */
const defaultGetScrollHandler = (onScroll: Function): Function => {
  let rAFLock = false
  const scrollHandler = (e) => {
    if (rAFLock) return

    requestAnimationFrame(() => {
      onScroll(e)
      rAFLock = false
    })
    rAFLock = true
  }

  return scrollHandler
}

export interface ScrollListenerConfig {
  element: HTMLBaseElement
  scrollHandler?: Function
  getScrollDistance?: Function
  distanceToReachEnd?: number
  onEndReached?: Function
  distanceEvents?: DistanceEventType[]
  direction?: 'vertical' | 'horizontal'
}

export default class ScrollListener {
  config: ScrollListenerConfig
  getScrollDistance: Function

  constructor(config: ScrollListenerConfig) {
    this.config = config
    this.init()
  }

  destroy = () => null
  init() {
    const {
      element,
      scrollHandler: getScrollHandler = defaultGetScrollHandler,
      getScrollDistance: configGetScrollDistance,
      direction = 'vertical',
    } = this.config

    // 若无滚动载体，报错并退出
    if (typeof element === 'undefined') {
      console.error('Need Scroll Container!')
      return
    }

    const getScrollDistance = isFunction(configGetScrollDistance)
      ? configGetScrollDistance
      : {
          vertical: () => element.scrollTop,
          horizontal: () => element.scrollLeft,
        }[direction]

    this.getScrollDistance = getScrollDistance

    this.genDynamicEvents()
    this.genStaticEvents()

    let prevScrollDistance = getScrollDistance()
    const onScroll = (e) => {
      e.stopPropagation()

      // body 元素的 scrollDistance 取值时不同于普通元素
      const scrollDistance = getScrollDistance()
      const direction =
        scrollDistance > prevScrollDistance
          ? DIRECTION_FORWARD
          : DIRECTION_BACKWARD
      const walkParams = {
        scrollDistance,
        direction,
      }

      this.walkStaticEvent(walkParams)
      this.walkDynamicEvents(walkParams)

      prevScrollDistance = scrollDistance
    }

    const scrollHandler = getScrollHandler(onScroll)

    element.addEventListener(SCROLL_EVENT_NAME, scrollHandler)

    this.destroy = () =>
      element.removeEventListener(SCROLL_EVENT_NAME, scrollHandler)

    return this
  }

  getEndReachedEvent() {
    const {
      distanceToReachEnd = 100,
      onEndReached,
      element,
      direction = 'vertical',
    } = this.config

    /**
     * 若使用触底函数，则启用相关逻辑
     */
    if (!isFunction(onEndReached)) {
      return
    }

    // 触底函数是否被冻结，将此值置为 true 则停止使用触底函数
    let isEndReacherFreeze = false

    /**
     * 每次触发 onEndReached 函数后会自动阻止下一次触发，需要执行 done 函数来释放阻止
     * （例如滚动到底部后开始做网络请求时，再次滚动到底部不会触发二次请求）
     * 如果 isOver 为 true 则不会再触发后续的 onEndReached
     * （例如已经加载了全部数据，不需要再监听触底事件）
     */
    const done = (isOver) => {
      if (!isOver) {
        isEndReacherFreeze = false
        return
      } else {
        if (
          this.staticEvents.length === 0 &&
          this.dynamicEvents.length === 1 &&
          this.dynamicEvents[0] === endReachedEvent
        ) {
          this.destroy()
        }
      }
    }

    const endReachedEvent = {
      dynamic: true,
      distance: {
        vertical: () =>
          element.scrollHeight - element.offsetHeight - distanceToReachEnd,
        horizontal: () =>
          element.scrollWidth - element.offsetWidth - distanceToReachEnd,
      }[direction],
      onGoingOut: () => {
        if (isEndReacherFreeze) return
        isEndReacherFreeze = true
        onEndReached(done)
      },
    }

    return endReachedEvent
  }

  dynamicEvents = []
  genDynamicEvents() {
    const { distanceEvents: configDistanceEvents = [] } = this.config
    const endReachedEvent = this.getEndReachedEvent()
    const scrollDistance = this.getScrollDistance()

    const dynamicEvents = [...configDistanceEvents, endReachedEvent]
      .filter((event) => event && event.dynamic)
      .map((event) => ({
        ...event,
        status: scrollDistance > event.distance ? OUTSIDE : INSIDE, // 初始化滚动事件节点状态
      }))
    this.dynamicEvents = dynamicEvents
  }

  currentStaticEvent
  staticEvents = []
  genStaticEvents() {
    const { distanceEvents: configDistanceEvents = [] } = this.config
    const scrollDistance = this.getScrollDistance()

    const staticEvents = configDistanceEvents
      .map((event) => ({
        ...event,
        distance: getEventDistance(event),
      }))
      .filter((event) => event.distance >= 0 && !event.dynamic)
      .map((event, idx) => {
        const staticEvent = {
          ...event,
          prevEvent: undefined,
          nextEvent: undefined,
          getPrevEvent: () => {
            const prevEvent = staticEvents[idx - 1] || null
            staticEvent.prevEvent = prevEvent

            return prevEvent
          },
          getNextEvent: () => {
            const nextEvent = staticEvents[idx + 1] || null
            staticEvent.nextEvent = nextEvent

            return nextEvent
          },
          status: scrollDistance > event.distance ? OUTSIDE : INSIDE, // 初始化滚动事件节点状态
        }

        return staticEvent
      })

    this.staticEvents = staticEvents
    this.currentStaticEvent = staticEvents.find(
      (event) => event.distance >= scrollDistance
    )
  }

  walkEvent = (event, scrollDistance) => {
    const {
      onGoingIn = () => undefined,
      onGoingOut = () => undefined,
      status,
    } = event
    const distance = getEventDistance(event)

    // 仅当状态值变更时触发 onGoingIn、onGoingOut 函数
    switch (status) {
      case INSIDE: {
        if (scrollDistance > distance) {
          onGoingOut()
          event.status = OUTSIDE
        }
        break
      }
      default:
      case OUTSIDE: {
        if (scrollDistance <= distance) {
          onGoingIn()
          event.status = INSIDE
        }
        break
      }
    }

    return event.status !== status
  }

  walkStaticEvent = ({ direction, scrollDistance }) => {
    const current = this.currentStaticEvent

    if (!current) {
      return
    }

    const prev = current.prevEvent || current.getPrevEvent()
    const next = current.nextEvent || current.getNextEvent()
    const target =
      direction === DIRECTION_FORWARD
        ? current
        : current.status === OUTSIDE
        ? current
        : prev

    if (target) {
      const changed = this.walkEvent(target, scrollDistance)

      // 若发生状态变迁
      if (changed) {
        this.currentStaticEvent =
          (direction === DIRECTION_FORWARD ? next : prev) || current

        this.walkStaticEvent({ direction, scrollDistance })
      }
    }
  }

  walkDynamicEvents = ({ direction, scrollDistance }) => {
    this.dynamicEvents
      .sort(
        (prev, next) =>
          (getEventDistance(prev) - getEventDistance(next)) * direction
      )
      .forEach((event) => {
        this.walkEvent(event, scrollDistance)
      })
  }
}
