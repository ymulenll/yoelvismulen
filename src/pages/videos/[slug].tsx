import { useRef, useState } from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getAllYouTubeVideoSlugs,
  getYouTubeVideoData,
  YTVideo,
} from '../../lib/videos'
import cx from 'classnames'
import VideoDescription from '../../components/videoDescription'
import VideoMetadata from '../../components/videoMetadata'
import dynamic from 'next/dynamic'
import type ReactPlayerProps from 'react-player'
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
})

type Props = {
  videoData?: YTVideo
}

export default function Video({ videoData }: Props) {
  const videoPlayerRef = useRef<ReactPlayerProps>()
  const [playing, setPlaying] = useState(false)

  if (!videoData) {
    return null
  }

  const handleSeekTo = (second: number) => {
    videoPlayerRef?.current?.seekTo(second)
    if (!playing) {
      setPlaying(true)
    }
  }
  return (
    <div>
      <Head>
        <title>{videoData.title}</title>
        <meta name="description" content={videoData.title} />
        <meta name="keywords" content={videoData.descriptionTags.join(', ')} />
      </Head>
      <article>
        <div className="mx-auto bg-gray-100 shadow-2xl dark:bg-zinc-800 sm:p-2 md:max-w-5xl">
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoData.id}`}
              width="100%"
              height="100%"
              controls
              onReady={(player) => {
                videoPlayerRef.current = player
              }}
              playing={playing}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          </div>
          <VideoMetadata video={videoData} />
          <h1
            className={cx(
              'border-b-2 border-dashed p-5 text-2xl font-semibold text-gray-700 dark:text-inherit sm:text-left'
            )}
          >
            {videoData.title}
          </h1>
          <VideoDescription
            handleSeekTo={handleSeekTo}
            className="mt-2 p-5 text-xl md:p-8"
          >
            {videoData.description}
          </VideoDescription>
        </div>
      </article>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const videoSlugs = getAllYouTubeVideoSlugs()
  const paths = videoSlugs.map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const videoData = getYouTubeVideoData(params!.slug as string)
  return {
    props: {
      videoData,
    },
  }
}
