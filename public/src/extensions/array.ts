import { deepClone } from './object'

export const castToArray = (value: any): any[] => {
  if (!value && typeof value !== 'boolean') {
    return []
  }

  return (Array.isArray(value) ? deepClone(value) : deepClone([value])).filter(
    (item: any) => item !== null && item !== undefined
  )
}

export const mergeArray = (input: any[], output: any[], key: string) => {
  const ids = new Set(input.map((d) => d[key]))
  return [...input, ...output.filter((d: any) => !ids.has(d[key]))]
}

export const firstOrDefault = <T>(input: T[]) => {
  if (!input || input?.length === 0) return null
  return input[0]
}

export const lastOrDefault = <T>(input: T[]) => {
  if (!input || input?.length === 0) return null
  return input[input.length - 1]
}

export const replaceItem = <T>(input: T[], item: T, key: string) => {
  if (!input || input?.length === 0) return []
  if (!key || !item) return input
  const indexItem = input.findIndex((i: T) => i[key] === item[key])
  if (indexItem < 0) return input
  const newArray = deepClone(input)
  newArray[indexItem] = item
  return newArray
}

export const replaceItemWithCondition = <T>({
  input,
  item,
  condition,
  merge
}: {
  input: T[]
  item: T
  condition: any
  merge?: boolean
}) => {
  if (!input || input?.length === 0) return []
  if (!condition || !item) return input
  const indexItem = input.findIndex(condition)
  if (indexItem < 0) return input
  const newArray = deepClone(input)
  newArray[indexItem] = merge ? { ...newArray[indexItem], ...item } : item
  return newArray
}

export const removeItem = <T>(input: T[], condition: any) => {
  if (!input || input?.length === 0) return []
  if (!condition) return input
  const indexItem = input.findIndex(condition)
  if (indexItem < 0) return input
  const newArray = deepClone(input)
  return [...newArray].splice(indexItem, 1)
}
