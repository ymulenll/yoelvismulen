import slugify from 'slugify'
import videos from '../data/videoDetails.json'
import { groupCount, sortMapByValueDesc, uniq } from './utils'

export interface YTVideo {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnails: Thumbnails
  tags: string[]
  descriptionTags: string[]
  duration: string
  embedHtml: string
  slug: string
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

const mapYouTubeVideos = (): YTVideo[] => {
  const snippets: YTVideo[] = videos.map(
    ({
      id,
      snippet: { title, description, publishedAt, thumbnails, tags = [] },
      contentDetails: { duration },
      player: { embedHtml },
    }) => {
      const descriptionTags = extractDescriptionTags(description)
      const slug = slugify(title, {
        lower: true,
        locale: 'es',
        remove: /[*+~.,()'"!:@]/g,
      })

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
        slug,
      }
    }
  )

  return snippets
}

const extractDescriptionTags = (description: string) => {
  const tags = [...description.matchAll(/[ \n]#(\w+)/g)].map(
    (value) => value[1]
  )
  const uniqTags = uniq(tags)

  return uniqTags
}

const youTubeVideos = mapYouTubeVideos()

export function getYouTubeVideos(): YTVideo[] {
  return youTubeVideos
}

export function getAllDescriptionTagsMap(): Record<string, number> {
  const allTags = youTubeVideos.map((video) => video.descriptionTags).flat()

  const allTagsMap = groupCount(allTags)

  const allTagsMapSorted = sortMapByValueDesc(allTagsMap)

  return Object.fromEntries(allTagsMapSorted)
}

export function getAllYouTubeVideoSlugs(): string[] {
  return youTubeVideos.map((video) => video.slug)
}

export function getYouTubeVideoData(slug: string) {
  return youTubeVideos.find((video) => video.slug === slug)
}
