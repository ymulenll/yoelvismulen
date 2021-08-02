import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
  return (
    <div className="fixed flex w-full bottom-0 justify-around sm:justify-start items-stretch sm:items-start sm:flex-col sm:w-auto sm:h-full shadow-2xl bg-white overflow-auto z-10">
      <Icon href="/">
        <RightIcon />
      </Icon>
      <Icon href="/home">
        <Image
          src="/profile.png"
          alt="Profile image"
          width={32}
          height={32}
          className="rounded-full filter grayscale group-hover:filter-none"
        />
      </Icon>
      <Icon href="/videos">
        <VideosIcon />
      </Icon>
      <Icon href="/playlists">
        <PlaylistsIcon />
      </Icon>
      <Icon href="/about" className="sm:mt-auto">
        <InfoIcon />
      </Icon>
    </div>
  )
}

const Icon = ({
  className,
  children,
  href,
}: {
  className?: string
  children: React.ReactNode
  href: string
}) => {
  const router = useRouter()
  return (
    <div
      className={`group flex items-center px-4 sm:py-3 cursor-pointer hover:bg-gray-100 ${
        className ?? ''
      }`}
    >
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </div>
  )
}

const iconStylesTW = 'fill-current stroke-current text-gray-400 group-hover:text-orange-500 w-8'

const RightIcon = () => (
  <svg
    width="60"
    height="49"
    viewBox="0 0 60 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={iconStylesTW}
  >
    <path
      d="M47.7813 33.2825L56.8085 24.2553L47.7813 15.2282M2.55316 3.51065H53.617H2.55316ZM2.55316 24.2553H56.8085H2.55316ZM2.55316 45H53.617H2.55316Z"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const VideosIcon = () => (
  <svg
    width="60"
    height="61"
    viewBox="0 0 60 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={iconStylesTW}
  >
    <path d="M6 18.5106H0V54.5106C0 57.8196 2.691 60.5106 6 60.5106H42V54.5106H6V18.5106Z" />
    <path d="M54 0.510635H18C16.4087 0.510635 14.8826 1.14278 13.7574 2.26799C12.6321 3.39321 12 4.91934 12 6.51064V42.5106C12 44.1019 12.6321 45.6281 13.7574 46.7533C14.8826 47.8785 16.4087 48.5106 18 48.5106H54C55.5913 48.5106 57.1174 47.8785 58.2426 46.7533C59.3679 45.6281 60 44.1019 60 42.5106V6.51064C60 4.91934 59.3679 3.39321 58.2426 2.26799C57.1174 1.14278 55.5913 0.510635 54 0.510635ZM27 36.5106V12.5106L48 24.5106L27 36.5106Z" />
  </svg>
)

const PlaylistsIcon = () => (
  <svg
    width="60"
    height="54"
    viewBox="0 0 60 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={iconStylesTW}
  >
    <path d="M60 8.01062V0.510622H0V8.01062H60ZM15 23.0106V15.5106H0V23.0106H15ZM22.5 15.5106H56.25C58.3125 15.5106 60 17.1981 60 19.2606V49.2606C60 51.3231 58.3125 53.0106 56.25 53.0106H22.5C20.4375 53.0106 18.75 51.3231 18.75 49.2606V19.2606C18.75 17.1981 20.4375 15.5106 22.5 15.5106ZM33.75 41.7606L46.2375 34.2606L33.75 26.7606V41.7606ZM15 38.0106V30.5106H0V38.0106H15ZM15 53.0106V45.5106H0V53.0106H15Z" />
  </svg>
)

const InfoIcon = () => (
  <svg
    width="60"
    height="64"
    viewBox="0 0 60 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${iconStylesTW} group-hover:text-blue-500`}
  >
    <path d="M50.3125 53.75H9.6875L0.3125 63.125V10C0.3125 4.84375 4.53125 0.625 9.6875 0.625H50.3125C55.4687 0.625 59.6875 4.84375 59.6875 10V44.375C59.6875 49.5312 55.4687 53.75 50.3125 53.75Z" />
    <path d="M26.875 22.5H33.125V39.6875H26.875V22.5Z" fill="white" />
    <path
      d="M30 17.8125C31.7259 17.8125 33.125 16.4134 33.125 14.6875C33.125 12.9616 31.7259 11.5625 30 11.5625C28.2741 11.5625 26.875 12.9616 26.875 14.6875C26.875 16.4134 28.2741 17.8125 30 17.8125Z"
      fill="white"
    />
  </svg>
)
