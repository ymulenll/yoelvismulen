import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import VideoCard from '../../components/videoCard'
import { getYouTubeVideos, YTVideo } from '../../lib/videos'

type Props = {
  videosData: YTVideo[]
}

export default function Videos({ videosData }: Props) {
  return (
    <div className="">
      <Head>
        <title>{Videos}</title>
      </Head>
      <div>
        <h1 className="text-4xl text-center sm:text-left p-5 text-gray-700 font-semibold my-4 border-b-2 border-dashed">
          Contenido
        </h1>
        <div className="grid grid-cols-[90%] md:grid-cols-[repeat(auto-fill,300px)] lg:grid-cols-[repeat(auto-fill,400px)] py-5 sm:py-10 px-5 gap-y-5 gap:5 md:gap-7 lg:gap-10 justify-evenly">
          {videosData.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const videosData = getYouTubeVideos()
  return {
    props: {
      videosData,
    },
  }
}
;('HPXdwErNahk,HIcCKT-eTKM,df7soTJ9vW0,bZsMWorjtFI,e14LvRFfjTg,xXyvlgjpQJo,ZOC7BjMDfq0,qa4oWn3Zvpk,ADbxRybIpH0,3z-Y4kbLrTM,afxLq1UFEfQ,C_okl27ybcg,hdgUDN1sgtA,xQstBIPeOdU,ZSfzjavepzM,DqjuUA_SDQg,N6ZR4M1z6Yc,l9xx8sv4Y7Y,97Ajv8-NRVY,BIXgEpITld4,5AQb1AQ4mz8,IbdwohdPRe8,IciVhWQ8npw,usRIvdhRTS8,LnEimHQRfFQ,MoWcVSWgsdc,RRs8edPoZzU,iKdwZ91Q4L8,PU1T9DSnxmc,b2X3sYjRAXY,AmDw_8U9TF8,R7AMcD96mqY,Sgf4HEAW-gQ,T4t00Hd3qZc,f3902x_dqqQ,EU53Lg-DSVM,Aiz4k7YVwvQ,bZD8qcJIEIE,2UBKjshUwM8,frsw1WDCxXQ,4IIqbJ3NUXU,LxSijnCrlz0,Uu0X6sM3s7Q,fKfgj8V7J6U,0eSdS5sJ7Ss,kRGQZ1bZH2A,DLYcLuAELPY,Mn4TFBXa_2g')
