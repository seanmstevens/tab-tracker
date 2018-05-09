<template>
  <v-layout>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
      <create-song-dialog v-model="dialog"></create-song-dialog>
    </v-dialog>
    <v-flex xs12 sm8 md6 lg4 offset-sm2 offset-md3 offset-lg4>
      <v-card>
        <v-toolbar flat dense dark color="pink">
          <v-toolbar-title>Songs</v-toolbar-title>
        </v-toolbar>
        <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg>
          <v-layout row wrap>
            <v-flex
              xs12
              v-for="song in songs"
              :key="song.id">
              <v-card class="song-card" ripple v-bind:style="{ backgroundColor: pickRandomColor() }">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs7>
                      <div>
                        <div class="headline">{{song.title}}</div>
                        <div>{{song.artist}}</div>
                      </div>
                    </v-flex>
                    <v-flex xs5>
                      <v-card-media
                        :src=song.albumImageUrl
                        height="125px"
                        contain
                      ></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CreateSongDialog from './CreateSong'
import SongsService from '@/services/SongsService'
import colors from 'vuetify/es5/util/colors'

export default {
  data () {
    return {
      songs: null,
      dialog: false
    }
  },
  methods: {
    pickRandomColor () {
      const keys = Object.keys(colors)
      return colors[keys[keys.length * Math.random() << 0]].base
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  components: {
    CreateSongDialog
  }
}
</script>

<style scoped>
  .song-card {
    cursor: pointer;
  }
</style>
