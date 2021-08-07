export const uniq = <T>(list: T[]) => [...new Set(list)]

export const groupCount = (list: string[]): Map<string, number> => {
  return list.reduce((acc, current) => {
    const newAcc = new Map(acc)
    const currentValue = acc.get(current)
    return newAcc.set(current, currentValue ? currentValue + 1 : 1)
  }, new Map<string, number>())
}

export const sortMapByValueDesc = (
  map: Map<string, number>
): Map<string, number> => {
  return new Map(
    [...map].sort((a, b) => {
      if (a[1] < b[1]) return 1
      if (a[1] > b[1]) return -1
      return 0
    })
  )
}
