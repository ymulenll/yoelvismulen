const http = require('https')
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
    console.log(error)
    throw error
  }
})()

function updateOutputFile(videoDetails) {
  const file = fs.existsSync(outputFile)
    ? fs.readFileSync(outputFile)
    : Buffer.from('')

  const videoDetailsString = JSON.stringify(videoDetails, null, 2)
  const isDifferent = !file.equals(Buffer.from(videoDetailsString))

  console.log('isDifferent:', isDifferent)
  if (isDifferent) {
    fs.writeFileSync(outputFile, JSON.stringify(videoDetails, null, 2))
  }
}

async function getVideoDetails(playlistItems) {
  const playlistItemChunks = chunks(playlistItems, 50)

  let videoDetails = []
  for (const playlistItemsChunk of playlistItemChunks) {
    const videoDetailsPath = `/youtube/v3/videos?part=contentDetails&part=snippet&part=player&maxResults=50&id=${playlistItemsChunk
      .map((item) => item.contentDetails.videoId)
      .join(',')}`
    videoDetailsResult = await httpRequest(videoDetailsPath)
    videoDetails = videoDetails.concat(videoDetailsResult.items)
  }
  return videoDetails
}

async function getPlaylistItems(playlistId) {
  const playlistItemsPath = `/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}`

  let playlistItemsResult = null
  let playlistItems = []

  do {
    playlistItemsResult = await httpRequest(
      `${playlistItemsPath}&pageToken=${
        playlistItemsResult?.nextPageToken ?? ''
      }`
    )

    playlistItems = playlistItems.concat(playlistItemsResult.items)
  } while (playlistItemsResult.nextPageToken)
  return playlistItems
}

async function getPlaylistId() {
  const channelDetailsPath = `/youtube/v3/channels?part=contentDetails&id=${channelId}`

  const channelDetails = await httpRequest(channelDetailsPath)
  const playlistId =
    channelDetails.items[0].contentDetails.relatedPlaylists.uploads
  return playlistId
}

// return chunks from array
const chunks = (array, size) => {
  const chunkedArray = []
  for (let index = 0; index < array.length; index += size) {
    chunkedArray.push(array.slice(index, size + index))
  }
  return chunkedArray
}

/**
 * @param {string} path
 */
function httpRequest(path) {
  /** @type http.RequestOptions */
  const options = {
    method: 'GET',
    hostname: 'www.googleapis.com',
    port: 443,
    path: `${path}&key=${key}`,
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, function (res) {
      const chunks = []

      res.on('data', function (chunk) {
        chunks.push(chunk)
      })

      res.on('end', function () {
        const body = Buffer.concat(chunks)

        resolve(JSON.parse(body.toString()))
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.end()
  })
}
