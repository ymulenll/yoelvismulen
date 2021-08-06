import React, { ReactElement } from 'react'
import { getHumanTimeTo } from '../lib/dates'
import { YTVideo } from '../lib/videos'

type Props = {
  video: YTVideo
}

export default function VideoMetadata({ video }: Props): ReactElement {
  return (
    <div className="text-gray-600 font-medium text-right p-2 mt-2">
      {getHumanTimeTo(video.publishedAt)}
    </div>
  )
}
