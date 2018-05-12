const Genius = require('genius-api')
const dotenv = require('dotenv')
const cheerio = require('cheerio')
const fetch = require('node-fetch')

if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}

const accessToken = process.env.accessToken
const genius = new Genius(accessToken)

Genius.prototype.fetchSongUrl = function (songTitle, artistName) {
  const normalizeParam = name => name.replace(/\./g, '').toLowerCase()
  const normalizedTitle = normalizeParam(songTitle)
  const normalizedName = normalizeParam(artistName)

  return this.search(`${normalizedName} ${normalizedTitle}`)
    .then(response => {
      for (let i = 0; i < response.hits.length; i++) {
        const hit = response.hits[i]
        if (hit.type === 'song' && normalizeParam(hit.result.primary_artist.name) === normalizedName) {
          return hit.result
        } else {}

        throw new Error(`Unable to find a match for ${artistName} - ${songTitle}`)
      }
    })
    .then(songInfo => songInfo.url)
}

Genius.prototype.getSongLyrics = geniusUrl => (
  fetch(geniusUrl, {
    method: 'GET'
  })
    .then(response => {
      if (response.ok) return response.text()
      throw new Error('Could not get song URL.')
    })
    .then(parseSongHtml)
)

const parseSongHtml = htmlText => {
  const $ = cheerio.load(htmlText)
  const lyrics = $('.lyrics').text()

  return lyrics
}

genius.fetchSongUrl('Abandoned Flesh', 'The Mountain Goats')
  .then(url => {
    genius.getSongLyrics(url)
  })
  .catch(err => console.error(err))
