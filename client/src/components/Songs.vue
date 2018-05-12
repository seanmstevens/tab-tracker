<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12 sm8 md6 lg4 class="mx-auto">
        <v-card>
          <v-toolbar card dense dark color="indigo lighten-1">
            <v-icon>library_music</v-icon>
            <v-toolbar-title>Song Library</v-toolbar-title>
          </v-toolbar>
          <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
          class="grey lighten-4">
            <v-layout row wrap>
              <v-subheader
                v-if="songs === null || songs.length === 0">
                No songs to display :(
              </v-subheader>
              <v-flex
                xs12
                v-for="song in songs"
                :key="song.id">
                <v-card
                  class="song-card"
                  dark
                  ripple
                  color="blue"
                  :to="{
                    name: 'song',
                    params: {
                      songId: song.id
                    }
                  }">
                  <v-container fluid grid-list-lg>
                    <v-layout row>
                      <v-flex xs7>
                        <div>
                          <h3 class="headline">{{song.title}}</h3>
                          <div class="subtle-text">{{song.artist}}</div>
                        </div>
                      </v-flex>
                      <v-flex xs5>
                        <v-card-media
                          :src="song.albumImageUrl"
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
          <v-card-text style="height: 48px; position: relative">
            <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
              @click.stop="openDialog">
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CreateSongDialog from './CreateSong'
import SongsService from '@/services/SongsService'
import colors from 'vuetify/es5/util/colors'

export default {
  data () {
    return {
      songs: null,
      showCreateSongDialog: false
    }
  },
  methods: {
    pickRandomColor () {
      const keys = Object.keys(colors)
      return colors[keys[keys.length * Math.random() << 0]].darken1
    },
    async getSongs () {
      this.songs = (await SongsService.index()).data
    },
    openDialog () {
      this.$store.dispatch('toggleCreateSongDialog')
    }
  },
  mounted () {
    this.getSongs()
    console.log(this.songs)
  },
  updated () {
    console.log('component updated')
  },
  components: {
    CreateSongDialog
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
