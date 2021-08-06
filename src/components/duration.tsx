import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

type Props = {
  children: string
  className?: string
}

export const Duration = ({ children: duration, className }: Props) => {
  return (
    <div className={className}>
      {dayjs
        .duration(duration)
        .format(`${duration.includes('H') ? 'H:' : ''}m:ss`)}
    </div>
  )
}
