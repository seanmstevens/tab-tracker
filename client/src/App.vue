<template>
  <div id="app">
    <v-app>
      <nav-drawer v-if="$vuetify.breakpoint.smAndDown"></nav-drawer>
      <page-header></page-header>
      <create-song-dialog></create-song-dialog>
      <v-content>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-content>
      <page-footer></page-footer>
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/Header'
import PageFooter from './components/Footer'
import CreateSongDialog from './components/CreateSong'
import NavDrawer from './components/NavDrawer'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
    CreateSongDialog,
    NavDrawer
  }
}
</script>

<style>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 200ms cubic-bezier(0.5, 0.08, 0, 1);
}

.fade-leave-active {
  transition: opacity 200ms cubic-bezier(0.5, 0.08, 0, 1);
  opacity: 0;
}

.text--white-translucent {
  color: rgba(255, 255, 255, 0.8);
}

.text--black-translucent {
  color: rgba(0, 0, 0, 0.7);
}
</style>
