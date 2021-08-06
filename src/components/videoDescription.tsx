import React, { ReactElement } from 'react'
import cx from 'classnames'

type Props = {
  children: string
  className?: string
}

export default function VideoDescription({
  children: description,
  className,
}: Props): ReactElement {
  return (
    <div
      className={cx('whitespace-pre-wrap', className)}
      dangerouslySetInnerHTML={{ __html: linkify(description) }}
    />
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
