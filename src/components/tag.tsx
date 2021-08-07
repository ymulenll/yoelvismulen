import { useRouter } from 'next/dist/client/router'
import cx from 'classnames'

type Props = {
  children: string
  quantity?: number
}

export default function Tag({ children: tag, quantity }: Props) {
  const { query, push } = useRouter()
  const tagFilter = query?.tags as string
  const isInQuery = tagFilter === tag

  const { color, background } =
    tagColors[tag.toLowerCase()] ?? tagColors.default

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        return push(isInQuery ? '/videos' : `/videos?tags=${tag}`)
      }}
    >
      <div
        className={cx(
          'px-2 py-1 italic text-lg sm:text-xl inline-block mb-2 mr-2',
          { 'ring-2 ring-orange-500 ring-offset-1': isInQuery }
        )}
        style={{ color, background }}
      >
        #{tag}
        {quantity && ` (${quantity})`}
      </div>
    </button>
  )
}

const tagColors: Record<string, { color: string; background: string }> = {
  default: {
    color: '#F9FAFB',
    background: '#4B5563',
  },
  aws: {
    color: '#000000',
    background: '#FF9900',
  },
  cloud: {
    color: '#000000',
    background: '#75c6ec',
  },
  javascript: {
    color: '#000000',
    background: '#EFD81D',
  },
  reactjs: {
    color: '#000000',
    background: '#61DAFB',
  },
  css: {
    color: '#FFFFFF',
    background: '#2965F1',
  },
  html: {
    color: '#FFFFFF',
    background: '#F16529',
  },
  webpack: {
    color: '#000000',
    background: '#8FD7FB',
  },
}
