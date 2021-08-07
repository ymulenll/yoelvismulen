import React, { ReactElement } from 'react'
import { formatDate, getHumanTimeTo } from '../lib/dates'
import { YTVideo } from '../lib/videos'

type Props = {
  video: YTVideo
}

export default function VideoMetadata({ video }: Props): ReactElement {
  return (
    <div className="text-blue-900 text-opacity-80 font-medium italic text-right mr-1 mt-1">
      {formatDate(video.publishedAt)}
    </div>
  )
}
