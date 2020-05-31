interface Attr {
  [key: string]: any[]
}

export default class CombJubge {
  public list: Object | any[]
  public attr: Attr
  public attrKey: string[]

  constructor(list: Object | any[]) {
    this.list = list

    this.attr = Object.entries(list).reduce((attr: Attr, [, item]) => {
      Object.entries(item).forEach(([key, val]) => {
        attr[key] = attr[key] || []
        attr[key] = [...new Set([...attr[key], val])]
      })

      return attr
    }, {})

    this.attrKey = Object.keys(this.attr)
  }

  private have = (activeAttr: Object): boolean =>
    Object.values(this.list).some((item) =>
      Object.entries(activeAttr).every(([key, val]) => item[key] === val)
    )

  public adaptedAttr = (activeAttr: Object): Object =>
    Object.entries(this.attr).reduce(
      (adaptedAttr, [key, values]) =>
        Object.assign(adaptedAttr, {
          [key]: values.filter((val) =>
            this.have(
              Object.assign({}, activeAttr, {
                [key]: val,
              })
            )
          ),
        }),
      {}
    )

  public find = (activeAttr: Object): string | undefined => {
    for (let [id, item] of Object.entries(this.list)) {
      if (
        Object.entries(activeAttr).every(([key, val]) => item[key] === val) &&
        Object.keys(item).every((key) => key in activeAttr)
      ) {
        return id
      }
    }
  }
}
