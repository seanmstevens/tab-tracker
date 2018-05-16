<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12 sm8 md6 lg4 class="mx-auto">
        <songs-panel />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsPanel from './SongsPanel'

export default {
  data () {
    return {
      songs: null
    }
  },
  components: {
    SongsPanel
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
