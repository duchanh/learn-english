import { DATE_VI } from '@/constants/date'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { roundDown } from './number'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.locale('vi')
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(customParseFormat)

type DateType = string | number | Date | dayjs.Dayjs | null | undefined

export const FORMAT_DATE = 'DD-MM-YYYY'
export const FORMAT_DATE_VN = 'DD/MM/YYYY'

export const getRelativeTime = (date: DateType) => {
  const minutes = Math.abs(dayjs(date).diff(new Date(), 'minutes'))

  if (minutes < 1) {
    return 'Vừa xong'
  }
  const oneHour = 60
  // (Ngày giờ hiện tại - ngày đăng tin)<60 phút: hiển thị định dạng x phút trước
  if (minutes < oneHour) {
    return `${minutes} phút trước`
  }

  const oneDay = oneHour * 24
  // 24 tiếng> (Giờ hiện tại - thời gian tạo) >= 60 phút: hiển thị định dạng x tiếng trước
  if (minutes >= oneHour && minutes < oneDay) {
    return `${roundDown(minutes / oneHour)} tiếng trước`
  }

  // 6 ngày > (Giờ hiện tại - thời gian tạo) >= 24 tiếng: hiển thị định dạng x
  if (minutes >= oneDay && minutes < 7 * oneDay) {
    return `${roundDown(minutes / oneDay)} ngày trước`
  }

  const oneWeek = oneDay * 7
  // 28 ngày >= (Giờ hiện tại - thời gian tạo) >= 7 ngày: hiển thị định dạng x tuần trước
  if (minutes >= 7 * oneDay && minutes <= 28 * oneDay) {
    return `${roundDown(minutes / oneWeek)} tuần trước`
  }

  // 60 ngày >= (Giờ hiện tại - thời gian tạo) > 28 ngày: hiển thị theo định dạng x ngày trước
  if (minutes > 28 * oneDay && minutes <= 60 * oneDay) {
    return `${roundDown(minutes / oneDay)} ngày trước`
  }

  const oneMonth = oneDay * 30
  // 180 ngày >= (Giờ hiện tại - thời gian tạo) > 60 ngày: hiển thị theo định dạng x tháng trước
  if (minutes > 60 * oneDay && minutes <= 180 * oneDay) {
    return `${roundDown(minutes / oneMonth)} tháng trước`
  }

  return dayjs(date).format(DATE_VI)
}

export const getMinutesByDay = (date: DateType) => {
  return Math.abs(dayjs(date).diff(new Date(), 'minutes'))
}

export const subtractDuration = (
  date: DateType,
  value: number,
  unit: dayjs.ManipulateType | undefined
) => dayjs(date).subtract(value, unit)

export const formatDate = (input: any, format?: string) => {
  if (!input) return null
  return dayjs(input).format(format)
}

export const convertStringToDate = (input: any, format?: string) => {
  if (!input) return null

  return dayjs(input, format).toDate()
}

export const isPreviousTime = (
  dateOne: DateType,
  dateTwo: DateType,
  unit?: dayjs.OpUnitType | undefined
) => dayjs(dateOne).isBefore(dateTwo, unit)

export const convertSecondToString = (second: number) => {
  if (second < 60) {
    return `Dưới 1 phút`
  }
  if (second < 3600) {
    return `${Math.floor(second / 60)} phút`
  }
  if (second < 60 * 60 * 60) {
    return `${Math.floor(second / 3600)} giờ`
  }
  return `Dưới 1 tuần`
}

export const initDate = (date: any, format?: string) => dayjs(date, format)
export const getStartOfTime = (date: any, unit: dayjs.OpUnitType) => dayjs(date).startOf(unit)
export const getEndOfTime = (date: any, unit: dayjs.OpUnitType) => dayjs(date).endOf(unit)

export const isPreviousScheduleTimes = (scheduleTimes: number[]) => {
  const sortedTimes = [...scheduleTimes].sort((a, b) => a - b)

  const lastTime = sortedTimes[sortedTimes.length - 1]

  return isPreviousTime(dayjs.unix(lastTime), dayjs(), 'day')
}

// cal diff day between unix timestamp input && current day
export const schedulerDateDiff = (timestamp: number, date?: dayjs.Dayjs) => {
  const inputDate = dayjs.unix(timestamp)
  const formattedInputDate = inputDate.format('YYYY-MM-DD')
  const currentFormattedDate = (date ?? dayjs()).format('YYYY-MM-DD')

  const diffDay = dayjs(formattedInputDate).diff(dayjs(currentFormattedDate), 'day')

  return diffDay
}

export const filterListHourString = (data: any[]) => {
  const currentDate = dayjs().format('YYYY-MM-DD')

  return data.filter((value: any) => {
    return dayjs(`${currentDate} ${value?.use}`).valueOf() > dayjs().valueOf()
  })
}
