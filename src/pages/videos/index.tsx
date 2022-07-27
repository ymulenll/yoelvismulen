import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import VideoCard from '../../components/videoCard'
import {
  getAllDescriptionTagsMap,
  getYouTubeVideos,
  YTVideo,
} from '../../lib/videos'
import cx from 'classnames'
import { VideoFilters } from '../../components/videoFilters'
import { useRouter } from 'next/dist/client/router'

type Props = {
  videosData: YTVideo[]
  descriptionTagsMap: Record<string, number>
}

export default function Videos({ videosData, descriptionTagsMap }: Props) {
  const { query } = useRouter()
  const tagFilter = query?.tags as string

  const filteredVideos = tagFilter
    ? videosData.filter((video) => video.descriptionTags.includes(tagFilter))
    : videosData

  return (
    <div className="">
      <Head>
        <title>Videos</title>
      </Head>
      <div>
        <h1 className="text-2xl md:text-4xl text-center sm:text-left p-3 md:p-5 my-2 md:my-4 text-gray-700 font-semibold border-b-2 border-dashed">
          Videos
        </h1>
        <VideoFilters tags={descriptionTagsMap} />
        {filteredVideos.length > 0 && (
          <div
            className={cx(
              'grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]',
              'py-5 md:py-8 sm:px-5 gap-y-5 gap:5 md:gap-7 lg:gap-10 justify-items-center justify-evenly'
            )}
          >
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
        {!filteredVideos.length && (
          <div className="text-2xl p-4 text-center italic">
            No se encuentan resultados
          </div>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const videosData = getYouTubeVideos()
  const descriptionTagsMap = getAllDescriptionTagsMap()
  return {
    props: {
      videosData,
      descriptionTagsMap,
    },
  }
}
