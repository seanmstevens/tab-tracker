import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    createDialogOpen: false,
    drawerOpen: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    toggleCreateSongDialog (state) {
      state.createDialogOpen = !state.createDialogOpen
    },
    toggleNavDrawer (state) {
      state.drawerOpen = !state.drawerOpen
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    toggleCreateSongDialog ({commit}) {
      commit('toggleCreateSongDialog')
    },
    toggleNavDrawer ({commit}) {
      commit('toggleNavDrawer')
    }
  },
  plugins: [
    createPersistedState()
  ]
})
