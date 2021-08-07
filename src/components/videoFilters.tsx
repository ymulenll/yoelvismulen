import Tag from './tag'

interface Props {
  tags: Record<string, number>
}

export const VideoFilters = ({ tags }: Props) => {
  return (
    <div className="line-clamp-1">
      {Object.entries(tags).map(([tag, quantity]) => (
        <Tag key={tag} quantity={quantity}>
          {tag}
        </Tag>
      ))}
    </div>
  )
}
