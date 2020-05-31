import getClassNameArray from './getClassNameArray'

export default function classnames(...args: any[]): string {
  return [...new Set(getClassNameArray(args))].join(' ').trim()
}

interface ClassNameMapper {
  [key: string]: string
}

classnames.bind = (mapper: ClassNameMapper = {}) => (...args: any[]): string =>
  [
    ...new Set(
      getClassNameArray(args).map(
        (className: string) => mapper[className] || className
      )
    ),
  ]
    .join(' ')
    .trim()
