type Props = {
  children: string
}

export default function Tag({ children }: Props) {
  const { color, background } =
    tagColors[children.toLowerCase()] ?? tagColors.default

  return (
    <div className="px-2 py-1 italic text-xl" style={{ color, background }}>
      #{children}
    </div>
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
