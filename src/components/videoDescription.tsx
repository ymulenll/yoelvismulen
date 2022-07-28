import React, { ReactElement } from 'react'
import cx from 'classnames'
import parse, { Element, domToReact, htmlToDOM, Text } from 'html-react-parser'
import { isText, hasChildren } from 'domhandler'

import { timeStringToSeconds, formatDuration } from '../lib/dates'
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
}: Props): ReactElement {
  return (
    <div className={cx('whitespace-pre-wrap', className)}>
      {parse(linkify(description), {
        replace: (domNode) => {
          if (
            domNode instanceof Element &&
            domNode.attribs['data-time'] &&
            hasChildren(domNode)
          ) {
            const text = domNode.children[0]
            if (isText(text)) {
              const timeString = text.data
              const seconds = timeStringToSeconds(timeString)
              if (isNaN(seconds)) return
              return (
                <span
                  className="text-blue-900 cursor-pointer"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                    handleSeekTo(seconds)
                  }}
                >
                  {domToReact([domNode])}
                </span>
              )
            }
          }

          if (
            domNode instanceof Element &&
            domNode.attribs['data-tag'] &&
            hasChildren(domNode)
          ) {
            const text = domNode.children[0]
            if (isText(text)) {
              const tag = text.data

              return <Tag>{tag}</Tag>
            }
          }
        },
      })}
    </div>
  )
}

function linkify(text: string) {
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
        `<a href="${url}" target="_blank" class="text-blue-900 max-w-full inline-block overflow-hidden whitespace-nowrap overflow-ellipsis align-middle">${url}</a>`
    )
}
