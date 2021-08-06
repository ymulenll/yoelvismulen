import videos from '../data/videoDetails.json'

export interface YTVideo {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnails: Thumbnails
  tags?: string[]
  descriptionTags: string[]
  duration: string
  embedHtml: string
}

export interface Thumbnails {
  default: Thumbnail
  medium: Thumbnail
  high: Thumbnail
  standard?: Thumbnail
  maxres?: Thumbnail
}

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export function getYouTubeVideos(): YTVideo[] {
  const snippets: YTVideo[] = videos.items.map(
    ({
      id,
      snippet: { title, description, publishedAt, thumbnails, tags = [] },
      contentDetails: { duration },
      player: { embedHtml },
    }) => {
      const descriptionTags = extractDescriptionTags(description)
      return {
        id,
        title,
        description,
        publishedAt,
        thumbnails,
        tags,
        duration,
        embedHtml,
        descriptionTags,
      }
    }
  )

  return snippets
}

const extractDescriptionTags = (description: string) => {
  const tags = [...description.matchAll(/#(\w+)/g)].map((value) => value[1])
  const uniqTags = [...new Set(tags)]

  return uniqTags
}
