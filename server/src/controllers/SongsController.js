const { Song } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: 10
      })
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
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred while trying to create the song.'
      })
    }
  }
}
