// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import VueYoutubeEmbed from 'vue-youtube-embed'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#3F51B5',
    secondary: '#7986CB',
    accent: '#C0CA33',
    error: '#f44336',
    warning: '#FFC107',
    info: '#2196f3',
    success: '#4caf50'
  }
})

Vue.use(VueYoutubeEmbed)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
