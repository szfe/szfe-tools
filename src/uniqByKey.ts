const uniqByKey = <T>(array = [], key): T[] => {
  const cache = {}

  return array.filter((item) => {
    if (!(key in item)) {
      return true
    }

    const value = item[key]

    if (value in cache) {
      return false
    }

    cache[value] = true
    return true
  })
}

export default uniqByKey
