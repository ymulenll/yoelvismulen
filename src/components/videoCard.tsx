import { YTVideo } from '../lib/videos'
import Image from 'next/image'
import React from 'react'
import Tag from './tag'
import Link from 'next/link'
import { Duration } from './duration'

type Props = {
  video: YTVideo
}

const YT_BLACK_BARS_SPACE = 90

export default function VideoCard({ video }: Props) {
  return (
    <Link href={{ pathname: '/videos/[slug]', query: { slug: video.slug } }}>
      <a
        className={`max-w-[480px] cursor-pointer space-y-4 pb-4 shadow-xl transition hover:shadow-2xl sm:rounded-lg sm:border sm:hover:-translate-y-0.5 sm:dark:border-none sm:dark:hover:-translate-y-0 sm:dark:hover:outline sm:dark:hover:outline-slate-200`}
      >
        <div className="relative">
          <Image
            src={video.thumbnails.high.url}
            alt={video.title}
            width={video.thumbnails.high.width} //480
            height={video.thumbnails.high.height - YT_BLACK_BARS_SPACE} // 360 - 90 = 270
            objectFit="cover"
            placeholder="blur"
            blurDataURL={video.thumbnails.default.url}
            className="sm:rounded-lg"
          />
          <Duration className="absolute bottom-3 right-1 bg-gray-900 px-1 text-lg text-white">
            {video.duration}
          </Duration>
        </div>
        <div className="px-5 text-lg font-medium sm:text-xl">{video.title}</div>
        <div className="px-5" role="tablist">
          {video.descriptionTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </a>
    </Link>
  )
}
