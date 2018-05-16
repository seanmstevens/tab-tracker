const { Song } = require('../models')

function extractYoutubeId (url) {
  // parse URL and extract the ID. works on nearly all URL formats
  url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)

  // returns extracted ID if it is not undefined or the ID directly if that's what was provided
  return undefined !== url[2] ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0]
}

module.exports = {
  async index (req, res) {
    try {
      let songs = null
      const search = req.query.search

      if (search) {
        songs = await Song.findAll({
          where: {
            $or: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              [key]: {
                $like: `%${search}%`
              }
            }))
          }
        })
      } else {
        songs = await Song.findAll({
          order: [
            ['id', 'DESC']
          ],
          limit: 10
        })
      }
      res.send(songs)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred while trying to fetch songs.'
      })
    }
  },
  async show (req, res) {
    try {
      console.log(req.params)
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error occurred while trying song details.'
      })
    }
  },
  async post (req, res) {
    try {
      const { youtubeUrl } = req.body
      const youtubeId = extractYoutubeId(youtubeUrl)

      req.body = Object.assign(req.body, { youtubeId })
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred while trying to create the song.'
      })
    }
  },
  async put (req, res) {
    try {
      const { youtubeUrl } = req.body
      const youtubeId = extractYoutubeId(youtubeUrl)

      req.body = Object.assign(req.body, { youtubeId })
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })

      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred while trying to update the song.'
      })
    }
  }
}
