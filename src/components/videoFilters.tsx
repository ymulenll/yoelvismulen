import { useRouter } from 'next/dist/client/router'
import { BREAKPOINTS } from '../constants'
import { useWindowSize, WindowSize } from '../hooks/useWindowSize'
import Tag from './tag'

interface Props {
  tags: Record<string, number>
}

function getNumberOfTagsToDisplay({ width = 0 }: WindowSize) {
  if (width > BREAKPOINTS['2xl']) return 10

  return width >= BREAKPOINTS.md ? 7 : 5
}

export const VideoFilters = ({ tags }: Props) => {
  const windowSize = useWindowSize()
  const { query } = useRouter()
  const tagFilter = query?.tags as string

  const tagEntries = Object.entries(tags)

  const tagDisplayNumber = getNumberOfTagsToDisplay(windowSize)

  const filterSelectedEntryIfNotVisible = (
    [tag]: [string, number],
    index: number
  ) => tag === tagFilter && index > tagDisplayNumber

  const selectedTagEntry = tagEntries.filter(filterSelectedEntryIfNotVisible)
  const restOfEntries = tagEntries.filter(
    (tagEntry, index) => !filterSelectedEntryIfNotVisible(tagEntry, index)
  )

  const entriesDisplay = [...selectedTagEntry, ...restOfEntries].slice(
    0,
    tagDisplayNumber
  )

  return (
    <div className="ml-2 text-center" role="tablist">
      {entriesDisplay.map(([tag, quantity]) => (
        <Tag key={tag} quantity={quantity}>
          {tag}
        </Tag>
      ))}
    </div>
  )
}
