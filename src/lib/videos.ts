import videos from '../data/videos.json'

export interface YTVideoSnippet {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnails: Thumbnails
}

export interface Thumbnails {
  default: Default
  medium: Default
  high: Default
  standard?: Default
  maxres?: Default
}

export interface Default {
  url: string
  width: number
  height: number
}

export function getYouTubeVideos(): YTVideoSnippet[] {
  const snippets: YTVideoSnippet[] = videos.items.map(({ snippet }) => ({
    id: snippet.resourceId.videoId,
    title: snippet.title,
    description: snippet.description,
    publishedAt: snippet.publishedAt,
    thumbnails: snippet.thumbnails,
  }))

  return snippets
}
