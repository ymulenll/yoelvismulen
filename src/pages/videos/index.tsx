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
        <title>{Videos}</title>
      </Head>
      <div>
        <h1 className="text-2xl md:text-4xl text-center sm:text-left p-3 md:p-5 my-2 md:my-4 text-gray-700 font-semibold border-b-2 border-dashed">
          Videos
        </h1>
        <VideoFilters tags={descriptionTagsMap} />
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
;('HPXdwErNahk,HIcCKT-eTKM,df7soTJ9vW0,bZsMWorjtFI,e14LvRFfjTg,xXyvlgjpQJo,ZOC7BjMDfq0,qa4oWn3Zvpk,ADbxRybIpH0,3z-Y4kbLrTM,afxLq1UFEfQ,C_okl27ybcg,hdgUDN1sgtA,xQstBIPeOdU,ZSfzjavepzM,DqjuUA_SDQg,N6ZR4M1z6Yc,l9xx8sv4Y7Y,97Ajv8-NRVY,BIXgEpITld4,5AQb1AQ4mz8,IbdwohdPRe8,IciVhWQ8npw,usRIvdhRTS8,LnEimHQRfFQ,MoWcVSWgsdc,RRs8edPoZzU,iKdwZ91Q4L8,PU1T9DSnxmc,b2X3sYjRAXY,AmDw_8U9TF8,R7AMcD96mqY,Sgf4HEAW-gQ,T4t00Hd3qZc,f3902x_dqqQ,EU53Lg-DSVM,Aiz4k7YVwvQ,bZD8qcJIEIE,2UBKjshUwM8,frsw1WDCxXQ,4IIqbJ3NUXU,LxSijnCrlz0,Uu0X6sM3s7Q,fKfgj8V7J6U,0eSdS5sJ7Ss,kRGQZ1bZH2A,DLYcLuAELPY,Mn4TFBXa_2g')
