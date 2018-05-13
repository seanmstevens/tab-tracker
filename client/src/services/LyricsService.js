import Api from './Api'

export default {
  fetchLyrics (songTitle, artistName) {
    return Api().get('lyrics', {
      params: {
        songTitle: songTitle,
        artistName: artistName
      }
    })
  }
}
