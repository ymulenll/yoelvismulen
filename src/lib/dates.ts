import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'

require('dayjs/locale/es')

dayjs.locale('es')

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const getHumanTimeTo = (dateFrom: string) => dayjs().to(dayjs(dateFrom))

export const formatDuration = (duration: string) =>
  dayjs.duration(duration).format(`${duration.includes('H') ? 'H:' : ''}m:ss`)
