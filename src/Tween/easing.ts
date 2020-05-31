// 参考 https://github.com/liriliri/licia/blob/master/src/e/easing.js
/*
 * export declare const easing: {
 *     linear(percent: number): number;
 *     inQuad(percent: number): number;
 *     outQuad(percent: number): number;
 *     inOutQuad(percent: number): number;
 *     outInQuad(percent: number): number;
 *     inCubic(percent: number): number;
 *     outCubic(percent: number): number;
 *     inQuart(percent: number): number;
 *     outQuart(percent: number): number;
 *     inQuint(percent: number): number;
 *     outQuint(percent: number): number;
 *     inExpo(percent: number): number;
 *     outExpo(percent: number): number;
 *     inSine(percent: number): number;
 *     outSine(percent: number): number;
 *     inCirc(percent: number): number;
 *     outCirc(percent: number): number;
 *     inElastic(percent: number, elasticity?: number): number;
 *     outElastic(percent: number, elasticity?: number): number;
 *     inBack(percent: number): number;
 *     outBack(percent: number): number;
 *     inOutBack(percent: number): number;
 *     outInBack(percent: number): number;
 *     inBounce(percent: number): number;
 *     outBounce(percent: number): number;
 * };
 */

export interface EasingFunctionMap {
  [key: string]: Function
}

/**
 * [缓动公式，网上找的，参考：http://www.cnblogs.com/brainworld/p/7240564.html]
 * @param  {[type]} pos [动画进行百分比，取值：0 - 1]
 * @return {[type]}     [description]
 */

function sinusoidal(pos: number): number {
  return -Math.cos(pos * Math.PI) / 2 + 0.5
}

function linear(pos: number): number {
  return pos
}

const easing: EasingFunctionMap = {
  inQuad: function (pos: number): number {
    return Math.pow(pos, 2)
  },

  outQuad: function (pos: number): number {
    return -(Math.pow(pos - 1, 2) - 1)
  },

  inOutQuad: function (pos: number): number {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2)
    return -0.5 * ((pos -= 2) * pos - 2)
  },

  inCubic: function (pos: number): number {
    return Math.pow(pos, 3)
  },

  outCubic: function (pos: number): number {
    return Math.pow(pos - 1, 3) + 1
  },

  inOutCubic: function (pos: number): number {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3)
    return 0.5 * (Math.pow(pos - 2, 3) + 2)
  },

  inQuart: function (pos: number): number {
    return Math.pow(pos, 4)
  },

  outQuart: function (pos: number): number {
    return -(Math.pow(pos - 1, 4) - 1)
  },

  inOutQuart: function (pos: number): number {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4)
    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2)
  },

  inQuint: function (pos: number): number {
    return Math.pow(pos, 5)
  },

  outQuint: function (pos: number): number {
    return Math.pow(pos - 1, 5) + 1
  },

  inOutQuint: function (pos: number): number {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5)
    return 0.5 * (Math.pow(pos - 2, 5) + 2)
  },

  inSine: function (pos: number): number {
    return -Math.cos(pos * (Math.PI / 2)) + 1
  },

  outSine: function (pos: number): number {
    return Math.sin(pos * (Math.PI / 2))
  },

  inOutSine: function (pos: number): number {
    return -0.5 * (Math.cos(Math.PI * pos) - 1)
  },

  inExpo: function (pos: number): number {
    return pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1))
  },

  outExpo: function (pos: number): number {
    return pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1
  },

  inOutExpo: function (pos: number): number {
    if (pos === 0) return 0
    if (pos === 1) return 1
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (pos - 1))
    return 0.5 * (-Math.pow(2, -10 * --pos) + 2)
  },

  inCirc: function (pos: number): number {
    return -(Math.sqrt(1 - pos * pos) - 1)
  },

  outCirc: function (pos: number): number {
    return Math.sqrt(1 - Math.pow(pos - 1, 2))
  },

  inOutCirc: function (pos: number): number {
    if ((pos /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - pos * pos) - 1)
    return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1)
  },

  outBounce: function (pos: number): number {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos
    } else if (pos < 2 / 2.75) {
      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75
    } else if (pos < 2.5 / 2.75) {
      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375
    } else {
      return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375
    }
  },

  inBack: function (pos: number): number {
    let s = 1.70158
    return pos * pos * ((s + 1) * pos - s)
  },

  outBack: function (pos: number): number {
    let s = 1.70158
    return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1
  },

  inOutBack: function (pos: number): number {
    let s = 1.70158
    if ((pos /= 0.5) < 1)
      return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s))
    return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2)
  },

  elastic: function (pos: number): number {
    return (
      -1 *
        Math.pow(4, -8 * pos) *
        Math.sin(((pos * 6 - 1) * (2 * Math.PI)) / 2) +
      1
    )
  },

  swingFromTo: function (pos: number): number {
    let s = 1.70158
    return (pos /= 0.5) < 1
      ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s))
      : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2)
  },

  swingFrom: function (pos: number): number {
    let s = 1.70158
    return pos * pos * ((s + 1) * pos - s)
  },

  swingTo: function (pos: number): number {
    let s = 1.70158
    return (pos -= 1) * pos * ((s + 1) * pos + s) + 1
  },

  bounce: function (pos: number): number {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos
    } else if (pos < 2 / 2.75) {
      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75
    } else if (pos < 2.5 / 2.75) {
      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375
    } else {
      return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375
    }
  },

  bouncePast: function (pos: number): number {
    if (pos < 1 / 2.75) {
      return 7.5625 * pos * pos
    } else if (pos < 2 / 2.75) {
      return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75)
    } else if (pos < 2.5 / 2.75) {
      return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375)
    } else {
      return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375)
    }
  },

  fromTo: function (pos: number): number {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 4)
    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2)
  },

  from: function (pos: number): number {
    return Math.pow(pos, 4)
  },

  to: function (pos: number): number {
    return Math.pow(pos, 0.25)
  },

  linear,

  sinusoidal,

  reverse: function (pos: number, transition = linear): number {
    return 1 - transition(pos)
  },

  mirror: function (pos: number, transition = linear): number {
    if (pos < 0.5) return transition(pos * 2)
    else return transition(1 - (pos - 0.5) * 2)
  },

  flicker: function (pos: number, transition = linear): number {
    pos = pos + (Math.random() - 0.5) / 5
    return transition(pos < 0 ? 0 : pos > 1 ? 1 : pos)
  },

  wobble: function (pos: number): number {
    return -Math.cos(pos * Math.PI * (9 * pos)) / 2 + 0.5
  },

  pulse: function (pos: number, pulses: number): number {
    return -Math.cos(pos * ((pulses || 5) - 0.5) * 2 * Math.PI) / 2 + 0.5
  },

  blink: function (pos: number, blinks: number): number {
    return Math.round(pos * (blinks || 5)) % 2
  },

  spring: function (pos: number): number {
    return 1 - Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6)
  },

  none: function (): number {
    return 0
  },

  full: function (): number {
    return 1
  },
}

const DEFAULT_ELASTICITY = 400

let pow = Math.pow,
  sqrt = Math.sqrt,
  sin = Math.sin,
  min = Math.min,
  asin = Math.asin,
  PI = Math.PI

let fns: EasingFunctionMap = {
  sine: function (t: number): number {
    return 1 + sin((PI / 2) * t - PI / 2)
  },
  circ: function (t: number): number {
    return 1 - sqrt(1 - t * t)
  },
  elastic: function (t: number, m: number): number {
    m = m || DEFAULT_ELASTICITY

    if (t === 0 || t === 1) return t

    let p = 1 - min(m, 998) / 1000,
      st = t / 1,
      st1 = st - 1,
      s = (p / (2 * PI)) * asin(1)

    return -(pow(2, 10 * st1) * sin(((st1 - s) * (2 * PI)) / p))
  },
  back: function (t: number): number {
    return t * t * (3 * t - 2)
  },
  bounce: function (t: number): number {
    let pow2,
      bounce = 4

    /* eslint-disable no-empty */
    while (t < ((pow2 = pow(2, --bounce)) - 1) / 11) {}

    return 1 / pow(4, 3 - bounce) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2)
  },
}
;['quad', 'cubic', 'quart', 'quint', 'expo'].forEach(function (name, i) {
  fns[name] = function (t: number): number {
    return pow(t, i + 2)
  }
})

const upperFirst = function (str: string): string {
  if (str.length < 1) return str

  return str[0].toUpperCase() + str.slice(1)
}

Object.entries(fns).forEach(function ([name, fn]) {
  name = upperFirst(name)
  easing[`in${name}`] = fn
  easing[`out${name}`] = function (t: number, m: number): number {
    return 1 - fn(1 - t, m)
  }
  easing[`inOut${name}`] = function (t: number, m: number): number {
    return t < 0.5 ? fn(t * 2, m) / 2 : 1 - fn(t * -2 + 2, m) / 2
  }
  easing[`outIn${name}`] = function (t: number, m: number): number {
    return t < 0.5 ? (1 - fn(1 - 2 * t, m)) / 2 : (fn(t * 2 - 1, m) + 1) / 2
  }
})

export default easing
