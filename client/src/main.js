// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#E91E63',
    secondary: '#FF4081',
    accent: '#40C4FF',
    error: '#f44336',
    warning: '#FFC107',
    info: '#2196f3',
    success: '#4caf50'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
