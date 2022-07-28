import React, { ReactElement } from 'react'
import { formatDate } from '../lib/dates'
import { YTVideo } from '../lib/videos'

type Props = {
  video: YTVideo
}

export default function VideoMetadata({ video }: Props): ReactElement {
  return (
    <div className="mr-1 mt-1 text-right font-medium italic text-blue-900 text-opacity-80 dark:text-blue-400">
      {formatDate(video.publishedAt)}
    </div>
  )
}
