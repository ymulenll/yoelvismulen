import React, { ReactElement } from 'react'
import cx from 'classnames'
import parse, { Element, domToReact } from 'html-react-parser'
import { isText } from 'domhandler'

import { timeStringToSeconds } from '../lib/dates'
import Tag from './tag'

type Props = {
  children: string
  handleSeekTo: (second: number) => void
  className?: string
}

export default function VideoDescription({
  children: description,
  handleSeekTo,
  className,
}: Props) {
  return (
    <div className={cx('whitespace-pre-wrap', className)}>
      {parse(tokenify(description), {
        replace: (domNode) => {
          if (
            domNode instanceof Element &&
            domNode.children[0] &&
            isText(domNode.children[0])
          ) {
            if (domNode.attribs['data-time']) {
              const text = domNode.children[0]
              const timeString = text.data
              const seconds = timeStringToSeconds(timeString)
              if (isNaN(seconds)) return
              return (
                <button
                  className="cursor-pointer text-blue-900 dark:text-blue-400"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                    handleSeekTo(seconds)
                  }}
                >
                  {domToReact([domNode])}
                </button>
              )
            }
            if (domNode.attribs['data-tag']) {
              const text = domNode.children[0]
              if (isText(text)) {
                const tag = text.data

                return <Tag>{tag}</Tag>
              }
            }
          }
        },
      })}
    </div>
  )
}

function tokenify(text: string) {
  const urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
  const newLineRegex = /\n/g
  const timeRegex = /(\d{1,2}:\d{2}:\d{2})|(\d{1,2}:\d{2})/g
  const tagsRegex = /([ \n])#(\w+)/g
  return text
    .replace(
      tagsRegex,
      (_match, prefix, tag) => `${prefix}<a data-tag=${tag}>${tag}</a>`
    )
    .replace(newLineRegex, '<br>')
    .replace(timeRegex, (match) => `<span data-time=${match}>${match}</span>`)
    .replace(
      urlRegex,
      (url) =>
        `<a href="${url}" target="_blank" rel="noopener" class="text-blue-900 dark:text-blue-400 max-w-full inline-block overflow-hidden whitespace-nowrap overflow-ellipsis align-middle">${url}</a>`
    )
}
