import { YTVideo } from '../lib/videos'
import Image from 'next/image'
import React from 'react'
import Tag from './tag'
import cx from 'classnames'

type Props = {
  video: YTVideo
}

export default function VideoCard({ video }: Props) {
  return (
    <div
      className={cx(
        'max-w-[480px] space-y-8 pb-8 border shadow-xl rounded-lg',
        'hover:-translate-y-0.5 hover:shadow-2xl transition cursor-pointer'
      )}
    >
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
      <div className="flex flex-wrap gap-3 px-5 mt-auto">
        {video.descriptionTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  )
}
