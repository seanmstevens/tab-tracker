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
  const normalizeParam = name => (
    removeAccents(name).replace(/\./g, '').toLowerCase()
  )
  const normalizedTitle = normalizeParam(songTitle)
  const normalizedName = normalizeParam(artistName)

  return this.search(`${normalizedName} ${normalizedTitle}`)
    .then(response => {
      for (let i = 0; i < response.hits.length; i++) {
        const hit = response.hits[i]
        if (hit.type === 'song' && normalizeParam(hit.result.primary_artist.name) === normalizedName) {
          return hit.result
        }
        console.error(`Unable to find a match for ${artistName} - ${songTitle}`)
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

const removeAccents = string => {
  const accents = 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź'
  const accentsOut = 'AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz'

  return string
    .split('')
    .map((letter, index) => {
      const accentIndex = accents.indexOf(letter)
      return accentIndex !== -1 ? accentsOut[accentIndex] : letter
    })
    .join('')
}

module.exports = {
  async fetchLyrics (req, res) {
    try {
      const { songTitle, artistName } = req.query
      let lyricsUrl
      const lyrics = await genius.fetchSongUrl(songTitle, artistName)
        .then(url => {
          if (!url) {
            return res.status(500).send({
              error: `Unable to find a match for "${artistName} - ${songTitle}"`
            })
          }

          lyricsUrl = url
          return genius.getSongLyrics(url)
        })

      res.send({
        lyrics: lyrics.trim(),
        url: lyricsUrl
      })
    } catch (err) {
      res.status(500).send({
        error: 'Unable to fetch lyrics.'
      })
    }
  }
}
