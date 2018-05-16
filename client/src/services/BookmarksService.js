import Api from './Api'

export default {
  index (params) {
    return Api().get('bookmarks', {
      params: params
    })
  },
  post (bookmark) {
    return Api().post('bookmarks', bookmark)
  },
  delete (bookmarkId) {
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}
