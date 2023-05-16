import { MIN_ROUND_NUMBER } from '@/constants/number'
import { removeAlphabets, removeSpecialCharacter, replaceAll } from './string'

export const roundDown = (num: number, decimal?: number) => {
  const pow = Math.pow(10, decimal ? decimal : 0)
  return Math.floor(num * pow) / pow
}

export const roundUp = (num: number, decimal?: number) => {
  const pow = Math.pow(10, decimal ? decimal : 0)
  return decimal && decimal > 0 ? Math.round(num * pow) / pow : Math.round(num)
}

export const roundNumber = (input?: number) => {
  if (!input) return null
  const number = Number(input)
  if (number % MIN_ROUND_NUMBER === 0) return number
  return Math.round(number)
}

export const castToNumber = (num: any) => {
  if (!num) return 0
  if (Number.isNaN(Number(num))) return 0
  return Number(num)
}

export const castToFloat = (num: any, thousandSeparate?: string, decimalSeparate?: string) => {
  if (!num) return null

  if (!Number.isNaN(Number(num))) return Number(num)

  const numFormatted = num
    .toString()
    .replace(thousandSeparate ?? '.', ' ')
    .replace(decimalSeparate ?? ',', '.')
  if (Number.isNaN(parseFloat(numFormatted))) return null
  return parseFloat(numFormatted)
}

export const formatNumber = (value: number | string | undefined) => {
  return value
    ? `${removeSpecialCharacter(removeAlphabets(value.toString()))}`.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )
    : '0'
}

export const randomArrayNumber = (length: number) => {
  return Array.from({ length: length }, () => Math.floor(Math.random() * length))
}

export const shortcutNumber = (num: number, digits: number = 1) => {
  if (!num || num === 0) return 0
  if (num < 1000) return num

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' }
  ]

  //const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  let number = getDecimalToNumber(num / item?.value, digits)
  replaceAll(number, '.', ',')
  let result = item ? number + item.symbol : '0'
  return result
}

export const getDecimalToNumber = (input: number, digits: number = 1) => {
  // Note that maximumSignificantDigits defaults to 3 so your decimals will be rounded if not changed.
  const parts = input.toLocaleString('en-US', { maximumSignificantDigits: 18 }).split('.')
  return parts.length > 1 ? `${parts[0]}.${parts[1]?.[digits - 1]}` : parts[0]
}
