import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import {
  getAllYouTubeVideoSlugs,
  getYouTubeVideoData,
  YTVideo,
} from '../../lib/videos'
import ReactPlayer from 'react-player'
import cx from 'classnames'

type Props = {
  videoData?: YTVideo
}

export default function Video({ videoData }: Props) {
  if (!videoData) {
    return null
  }

  return (
    <div>
      <Head>
        <title>{videoData.title}</title>
      </Head>
      <article className="">
        <h1
          className={cx(
            'text-4xl text-center sm:text-left p-5 text-gray-700 font-semibold my-4 border-b-2 border-dashed'
            // 'text-center'
          )}
        >
          {videoData.title}
        </h1>
        <div className="w-[90%] mx-auto md:max-w-5xl bg-gray-100 p-2 shadow-2xl">
          <div className="aspect-w-16 aspect-h-9">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoData.id}`}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: {
                    controls: 1,
                  },
                },
              }}
            />
          </div>
          <div
            className="p-5 mt-2 md:p-8 text-xl whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: linkify(videoData.description) }}
          />
        </div>
      </article>
    </div>
  )
}

function linkify(text: string) {
  var urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
  return text.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" class="text-blue-900 max-w-full inline-block overflow-hidden whitespace-nowrap overflow-ellipsis">${url}</a>`
  )
}

// const Description = ({children}:{children: string}) => {

// }

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
