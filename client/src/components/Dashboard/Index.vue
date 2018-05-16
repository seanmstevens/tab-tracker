<template>
  <v-container fluid fill-height>
    <v-layout row wrap justify-space-around>
      <v-flex xs12 sm8 md6 lg4>
        <v-container :class="$vuetify.breakpoint.xs ? 'pa-0' : null">
          <songs-panel></songs-panel>
        </v-container>
      </v-flex>
      <v-flex xs12 sm8 md6 lg4>
        <v-container :class="$vuetify.breakpoint.xs ? 'pa-0' : null">
          <bookmarks></bookmarks>
        </v-container>
      </v-flex>
      <v-flex xs12 sm8 md6 lg4>
        <v-container :class="$vuetify.breakpoint.xs ? 'pa-0' : null">
          <recently-viewed></recently-viewed>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsPanel from './SongsPanel'
import Bookmarks from './Bookmarks'
import RecentlyViewed from './RecentlyViewed'

export default {
  data () {
    return {
      songs: null
    }
  },
  components: {
    SongsPanel,
    Bookmarks,
    RecentlyViewed
  }
}
</script>

<style scoped>
  .song-card {
    cursor: pointer;
    background: linear-gradient(140deg, rgba(33,150,243,1) 0%, rgba(79,195,247,1) 100%);
  }

  .subtle-text {
    color: rgba(255, 255, 255, 0.8);
  }
</style>
