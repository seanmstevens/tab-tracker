import Api from './Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}

// AuthenticationService.register({
//   email: 'example.gmail.com',
//   password: 'Password123'
// })
