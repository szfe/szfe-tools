const preloadImage = (srcList: string[]): void =>
  srcList.forEach((src) => {
    const img = new Image()
    img.src = src
  })

export default preloadImage
