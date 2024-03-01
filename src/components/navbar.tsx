import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import cx from 'classnames'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useSpring, animated } from '@react-spring/web'
import { useWindowSize } from '../hooks/useWindowSize'
import { BREAKPOINTS } from '../constants'

export function Navbar() {
  const windowSize = useWindowSize()
  const isSmallOrAbove = (windowSize.width ?? 0) >= BREAKPOINTS.sm

  const [displayScrollbar, setDisplayScrollbar] = useState(true)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const shouldDisplayScrollbar = currPos.y > prevPos.y
      setDisplayScrollbar(shouldDisplayScrollbar)
    },
    [displayScrollbar],
    undefined,
    false,
    100
  )

  const props = useSpring({
    translateY: displayScrollbar || isSmallOrAbove ? '0%' : '100%',
  })

  return (
    <nav>
      <animated.ul
        className={
          'fixed bottom-0 z-10 flex w-screen items-stretch justify-around overflow-visible border-t bg-white shadow-2xl sm:h-full sm:w-auto sm:flex-col sm:items-start sm:justify-start sm:border-r sm:border-t-0'
        }
        style={props}
      >
        {/* <li>
          <Icon href="/" title="menú">
            <RightIcon />
          </Icon>
        </li> */}
        <li>
          <Icon href="/" title="página principal">
            <LogoImage href="/" />
          </Icon>
        </li>
        <li>
          <Icon href="/videos" title="contenidos">
            <VideosIcon />
          </Icon>
        </li>
        <li>
          <Icon href="/playlists" title="series">
            <PlaylistsIcon />
          </Icon>
        </li>
        <li className="sm:mt-auto">
          <Icon href="/about" title="acerca de">
            <InfoIcon />
          </Icon>
        </li>
      </animated.ul>
    </nav>
  )
}

const Icon = ({
  children,
  href,
  title,
}: {
  children: React.ReactNode
  href: string
  title: string
}) => {
  const router = useRouter()
  const isActive = router.pathname === href
  return (
    <div className="relative">
      <div className="peer">
        <Link href={href}>
          <a
            aria-label={title}
            className={cx(
              'group flex flex-shrink-0 cursor-pointer items-center px-6 py-3 transition sm:px-4 sm:py-6 hover-hover:hover:bg-gray-100',
              { 'text-orange-500': isActive, 'text-gray-400': !isActive },
              {
                'relative before:absolute before:left-0 before:top-0 before:block before:h-[1.5px] before:w-full before:bg-orange-400 before:bg-opacity-80 sm:before:h-full sm:before:w-[3px]':
                  isActive,
              }
            )}
          >
            {children}
          </a>
        </Link>
      </div>
      <div
        role="tooltip"
        className={cx(
          'absolute z-20 w-max sm:left-full sm:top-[50%] sm:ml-1 sm:-translate-y-1/2',
          'rounded bg-gray-500 px-4 py-1 font-mono text-white text-opacity-80 opacity-0 transition duration-300 hover-hover:peer-hover:opacity-100'
        )}
      >
        {title}
      </div>
    </div>
  )
}

const LogoImage = ({ href }: { href: string }) => {
  const router = useRouter()
  const isActive = router.pathname === href
  return (
    <div className="flex items-center">
      <Image
        src="/profile.png"
        alt="Imagen de perfil"
        role="button"
        width={32}
        height={32}
        layout="fixed"
        className={cx('rounded-full grayscale filter', {
          'filter-none': isActive,
        })}
      />
    </div>
  )
}

const iconStylesTW = 'fill-current stroke-current w-6 sm:w-8'

const RightIcon = () => (
  <svg
    width="60"
    height="32"
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
    height="32"
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
    height="32"
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
    height="32"
    viewBox="0 0 60 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={iconStylesTW}
  >
    <path d="M50.3125 53.75H9.6875L0.3125 63.125V10C0.3125 4.84375 4.53125 0.625 9.6875 0.625H50.3125C55.4687 0.625 59.6875 4.84375 59.6875 10V44.375C59.6875 49.5312 55.4687 53.75 50.3125 53.75Z" />
    <path d="M26.875 22.5H33.125V39.6875H26.875V22.5Z" fill="white" />
    <path
      d="M30 17.8125C31.7259 17.8125 33.125 16.4134 33.125 14.6875C33.125 12.9616 31.7259 11.5625 30 11.5625C28.2741 11.5625 26.875 12.9616 26.875 14.6875C26.875 16.4134 28.2741 17.8125 30 17.8125Z"
      fill="white"
    />
  </svg>
)
