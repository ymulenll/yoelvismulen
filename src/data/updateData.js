const https = require('https')
const fs = require('fs')

const key = process.env.YOUTUBE_TOKEN
const channelId = process.env.CHANNEL_ID || 'UCp28AG2NaDuzyVaAT--2NGQ'
const outputFile = process.env.OUTPUT || 'src/data/videoDetails.json'

;(async () => {
  if (!key) throw new Error('YOUTUBE_TOKEN is not set')

  try {
    const playlistId = await getPlaylistId()

    const playlistItems = await getPlaylistItems(playlistId)

    const videoDetails = await getVideoDetails(playlistItems)

    updateOutputFile(videoDetails)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

function updateOutputFile(videoDetails) {
  const file = fs.existsSync(outputFile)
    ? fs.readFileSync(outputFile)
    : Buffer.from('')

  const videoDetailsString = JSON.stringify(videoDetails, null, 2)
  const isDifferent = !file.equals(Buffer.from(videoDetailsString))

  if (isDifferent) {
    fs.writeFileSync(outputFile, videoDetailsString)

    return console.log(`${outputFile} updated`)
  }

  console.log('No update needed')
}

async function getVideoDetails(playlistItems) {
  const playlistItemChunks = chunks(playlistItems, 50)

  const videoDetails = (
    await Promise.all(playlistItemChunks.map(getVideoChunkDetails))
  ).flat()

  const VideoDetailsFiltered = videoDetails
    .map(removeETag)
    .filter(filterOutShorts)

  return VideoDetailsFiltered
}

function filterOutShorts(videoDetail) {
  return !videoDetail.snippet?.title.includes('#shorts')
}

function removeETag(videoDetail) {
  const { etag, ...videoDetailOmitETag } = videoDetail
  return videoDetailOmitETag
}

async function getVideoChunkDetails(playlistItemsChunk) {
  const videoIds = playlistItemsChunk
    .map((item) => item.contentDetails.videoId)
    .join(',')
  const videoDetailsPath = `/youtube/v3/videos?part=contentDetails&part=snippet&part=player&maxResults=50&id=${videoIds}`

  const videoDetailsResult = await httpRequest(videoDetailsPath)
  return videoDetailsResult.items
}

async function getPlaylistItems(playlistId) {
  const playlistItemsPath = `/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}`

  return getAllPlaylistItems([])

  async function getAllPlaylistItems(playlistItems, nextPageToken) {
    const playlistItemsResult = await httpRequest(
      `${playlistItemsPath}&pageToken=${nextPageToken ?? ''}`
    )

    return playlistItemsResult.nextPageToken
      ? getAllPlaylistItems(
          playlistItemsResult.items,
          playlistItemsResult.nextPageToken
        )
      : playlistItems.concat(playlistItemsResult.items)
  }
}



async function getPlaylistId() {
  const channelDetailsPath = `/youtube/v3/channels?part=contentDetails&id=${channelId}`

  const channelDetails = await httpRequest(channelDetailsPath)
  const playlistId =
    channelDetails.items[0].contentDetails.relatedPlaylists.uploads
  return playlistId
}

// return chunks from array
const chunks = (array, chunkSize) => {
  const chunkedArray = []
  for (let index = 0; index < array.length; index += chunkSize) {
    chunkedArray.push(array.slice(index, chunkSize + index))
  }
  return chunkedArray
}

/**
 * @param {string} path
 */
function httpRequest(path) {
  const url = `https://www.googleapis.com:443/${path}&key=${key}`

  return new Promise((resolve, reject) => {
    https
      .get(url, async (res) => {
        if (res.statusCode !== 200) {
          res.resume()
          reject(
            `Failed to fetch the resource ${path}, Status Code: ${res.statusCode}, Status Message: ${res.statusMessage}`
          )
          return
        }

        res.setEncoding('utf-8')
        let data = ''
        for await (const chunk of res) {
          data += chunk
        }
        resolve(JSON.parse(data))
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}
