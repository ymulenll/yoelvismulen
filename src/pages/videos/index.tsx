import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import VideoCard from '../../components/videoCard'
import {
  getAllDescriptionTagsMap,
  getYouTubeVideos,
  YTVideo,
} from '../../lib/videos'
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
        <meta
          name="description"
          content="Videos sobre programación web, AWS y mucho más."
        />
        <title>Videos</title>
      </Head>
      <div>
        <h1
          className={`mt-2 mb-4 border-b-2 border-dashed p-3 text-center text-2xl font-semibold text-gray-700 dark:text-inherit
          md:my-4 md:p-5 md:text-left md:text-4xl`}
        >
          Videos
        </h1>
        <VideoFilters tags={descriptionTagsMap} />
        {filteredVideos.length > 0 && (
          <div
            className={`gap:5 grid grid-cols-1 justify-evenly justify-items-center gap-y-5 py-5
            sm:px-5 
            md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:gap-7 md:py-8
            lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] lg:gap-10`}
          >
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
        {!filteredVideos.length && (
          <div className="p-4 text-center text-2xl italic">
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
