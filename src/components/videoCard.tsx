import React from 'react'
import { YTVideoSnippet } from '../lib/videos'
import Image from 'next/image'

type Props = {
  video: YTVideoSnippet
}

export default function VideoCard({ video }: Props) {
  return (
    <div className="w-[90vw] max-w-[480px] space-y-3 pb-5 border shadow-xl rounded-lg">
      <Image
        src={video.thumbnails.high.url}
        alt={video.title}
        width={video.thumbnails.high.width} //480
        height={video.thumbnails.high.height - 90} // 360 - 90 = 270
        objectFit="cover"
        placeholder="blur"
        blurDataURL={video.thumbnails.default.url}
        className="rounded-t-lg"
      />
      <div className="text-xl sm:text-2xl px-5">{video.title}</div>
    </div>
  )
}
