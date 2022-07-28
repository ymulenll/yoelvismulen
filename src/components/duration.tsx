import { formatDuration } from '../lib/dates'

type Props = {
  children: string
  className?: string
}

export const Duration = ({ children: duration, className }: Props) => {
  return <div className={className}>{formatDuration(duration)}</div>
}
