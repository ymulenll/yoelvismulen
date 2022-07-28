import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import localizedFormat from 'dayjs/plugin/localizedFormat'

require('dayjs/locale/es')

dayjs.locale('es')

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export const getHumanTimeTo = (dateFrom: string) => dayjs().to(dayjs(dateFrom))

export const formatDate = (date: string) => dayjs(date).format('LL')

export const formatDuration = (duration: string) =>
  dayjs.duration(duration).format(`${duration.includes('H') ? 'H:' : ''}m:ss`)

export const timeStringToSeconds = (ms: string) => {
  const [minutes, seconds] = ms.split(':')
  const totalSeconds = +minutes * 60 + +seconds
  return totalSeconds
}
