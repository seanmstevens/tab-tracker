const {
  History,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id

      const history = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ]
      }).map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))

      res.send(_.uniqBy(history, history => history.SongId))
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred while trying to fetch user history.'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.body

      const oldHistory = await History.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })

      // removing previous history record if it exists
      if (oldHistory) {
        oldHistory.destroy()
      }

      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occurred while trying to create the history object.'
      })
    }
  }
}
