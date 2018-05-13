<template>
  <div>
    <v-jumbotron
      dark
      color="indigo lighten-1"
      height="auto"
      >
      <v-container fill-height class="my-3">
        <v-layout align-center>
          <v-flex
            d-flex
            class="mr-3 album-image elevation-3">
            <img
              :src="song.albumImageUrl"
              style="height: 125px"/>
          </v-flex>
          <v-flex>
            <h3 class="display-2">
              {{song.title}}
            </h3>
            <h5 class="headline text--white-translucent">
              {{song.artist}}
            </h5>
            <h6 class="subheading text--white-translucent">
              {{song.album}}
            </h6>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-container
      fill-height
      :class="{ 'px-0 pt-0': $vuetify.breakpoint.xs }">
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm6>
            <v-card class="metadata-card pb-4">
              <v-subheader class="grey--text text--darken-1 px-4">
                <v-icon class="mr-2">video_library</v-icon>
                Music Video
              </v-subheader>
              <youtube
                :video-id="song.youtubeId"
                :player-width="'100%'"
                :player-height="300"
              >
              </youtube>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-expansion-panel>
              <v-expansion-panel-content ripple value="true">
                <div class="body-2 grey--text text--darken-1" slot="header">
                  <v-icon class="mr-2">assessment</v-icon>
                  Song Details
                </div>
                <v-card>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content
                ripple
                lazy
                @click.native="fetchLyrics">
                <div class="body-2 grey--text text--darken-1" slot="header">
                  <v-icon class="mr-2">music_note</v-icon>
                  Lyrics
                </div>
                <v-card>
                  <v-card-text>
                    <transition name="fade" mode="out-in">
                      <v-flex
                        key="loader"
                        v-if="fetchingLyrics"
                        xs4
                        class="mx-auto">
                        <v-layout column align-center>
                          <v-progress-circular
                            class="mb-2"
                            :width="3"
                            indeterminate
                            color="warning" />
                          <small class="fetch-text">Fetching lyrics...</small>
                        </v-layout>
                      </v-flex>
                      <div key="lyrics" v-else-if="!lyricsFetchError && song.lyrics">
                        <p class="lyrics">{{song.lyrics}}</p>
                        <a class="caption" href="https://genius.com" target="_blank">View lyrics on Genius</a>
                      </div>
                      <div key="error" v-else-if="lyricsFetchError">
                        <div class="fetch-error">{{ lyricsFetchError }}</div>
                      </div>
                    </transition>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content ripple>
                <div class="body-2 grey--text text--darken-1" slot="header">
                  <v-icon class="mr-2">queue_music</v-icon>
                  Tab
                </div>
                <v-card>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import LyricsService from '@/services/LyricsService'

export default {
  data () {
    return {
      song: {},
      fetchingLyrics: false,
      lyricsFetchError: null
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  methods: {
    async fetchLyrics () {
      if (!this.song.lyrics && !this.fetchingLyrics) {
        try {
          this.fetchingLyrics = true
          const { title, artist } = this.song
          this.song.lyrics = (await LyricsService.fetchLyrics(title, artist)).data.lyrics
          this.lyricsFetchError = null
        } catch (err) {
          this.lyricsFetchError = 'Unable to retrieve lyrics'
        }

        this.fetchingLyrics = false
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.metadata-card {
  align-self: flex-start;
}

.album-image {
  flex-grow: 0;
  border-radius: 2px;
  overflow: hidden;
  width: 125px;
  height: 125px;
}

.fetch-text {
  font-weight: 500;
  color: #757575;
}

.lyrics {
  white-space: pre-wrap;
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 3px;
  color: #6a6a6a;
}

.fetch-error {
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 3px;
  color: #f44336;
}
</style>
