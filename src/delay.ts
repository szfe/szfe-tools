const delay = (time?: number) =>
  new Promise((resolve) => {
    if (time === Infinity) {
      // Never resolve
      return
    }
    setTimeout(resolve, time)
  })

export default delay
