import React, { ReactElement } from 'react'
import { getHumanTimeTo } from '../lib/dates'
import { YTVideo } from '../lib/videos'

type Props = {
  video: YTVideo
}

export default function VideoMetadata({ video }: Props): ReactElement {
  return <div>{getHumanTimeTo(video.publishedAt)}</div>
}
