import { YTVideo } from '../lib/videos'
import Image from 'next/image'
import React from 'react'
import Tag from './tag'
import cx from 'classnames'
import Link from 'next/link'
import { Duration } from './duration'

type Props = {
  video: YTVideo
}

export default function VideoCard({ video }: Props) {
  return (
    <Link href={`/videos/${video.slug}`}>
      <a
        className={cx(
          'max-w-[480px] space-y-4 pb-4 shadow-xl sm:border sm:rounded-lg',
          'hover:-translate-y-0.5 hover:shadow-2xl transition cursor-pointer'
        )}
      >
        <div className="relative">
          <Image
            src={video.thumbnails.high.url}
            alt={video.title}
            width={video.thumbnails.high.width} //480
            height={video.thumbnails.high.height - 90} // 360 - 90 = 270
            objectFit="cover"
            placeholder="blur"
            blurDataURL={video.thumbnails.default.url}
            className="sm:rounded-t-lg"
          />
          <Duration className="absolute bottom-3 text-lg right-1 bg-gray-900 text-white px-1 opacity-90">
            {video.duration}
          </Duration>
        </div>
        <div className="text-lg sm:text-xl font-medium px-5">{video.title}</div>
        <div className="flex flex-wrap gap-3 px-5 mt-auto">
          {video.descriptionTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </a>
    </Link>
  )
}
