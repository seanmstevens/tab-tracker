<template>
  <div>
    <v-dialog
      :fullscreen="$vuetify.breakpoint.xs"
      v-model="dialog"
      width="800px"
      lazy
      scrollable
      persistent>
      <update-song-dialog
        @cancel="dialog = false"
        @update="updateInfo"
        :song="song"
      />
    </v-dialog>
    <v-jumbotron
      dark
      :color="$vuetify.breakpoint.xs ? null : 'indigo lighten-1'"
      height="auto"
      :gradient="$vuetify.breakpoint.xs ? gradient : null"
      :style="{ backgroundImage: 'url(' + song.albumImageUrl + ')' }"
      class="song-jumbotron">
      <v-container fill-height class="my-3">
        <v-layout align-center>
          <v-flex
            v-if="!$vuetify.breakpoint.xs"
            d-flex
            class="mr-3 album-image elevation-3">
            <img :src="song.albumImageUrl" />
          </v-flex>
          <v-flex>
            <v-flex d-flex align-start>
              <h3 class="display-2 no-grow">
                {{song.title}}
              </h3>
              <v-spacer v-if="$vuetify.breakpoint.xs"></v-spacer>
              <v-menu bottom left class="no-grow" transition="none">
                <v-btn slot="activator" flat dark fab small middle>
                  <v-icon medium>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile ripple @click="dialog = true">
                    <v-icon small class="mr-2">edit</v-icon>
                    <v-list-tile-title>Edit</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile v-if="isUserLoggedIn && !bookmark" ripple @click="bookmarkSong">
                    <v-icon small class="mr-2">book</v-icon>
                    <v-list-tile-title>Bookmark</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile v-if="isUserLoggedIn && bookmark" ripple @click="unbookmarkSong">
                    <v-icon small class="mr-2">remove_circle</v-icon>
                    <v-list-tile-title>Unbookmark</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
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
          <v-flex d-flex xs12 md6>
            <v-card class="metadata-card pb-4" v-resize="setPlayerHeight">
              <v-subheader class="grey--text text--darken-1 px-4">
                <v-icon class="mr-2">video_library</v-icon>
                Music Video
              </v-subheader>
              <youtube
                ref="player"
                :video-id="song.youtubeId"
                player-height="100%"
                player-width="100%"
                :style="{ height: playerHeight + 'px', width: '100%' }"
                >
              </youtube>
            </v-card>
          </v-flex>
          <v-flex xs12 md6>
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
                      <div key="lyrics" v-else-if="!lyricsFetchError && retrievedLyrics.lyrics">
                        <p class="lyrics">{{retrievedLyrics.lyrics}}</p>
                        <a
                          v-if="retrievedLyrics.url"
                          class="caption"
                          :href="retrievedLyrics.url"
                          target="_blank">
                          View lyrics on Genius
                        </a>
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
    <v-snackbar
      :timeout="4500"
      :bottom="$vuetify.breakpoint.xs"
      :left="!$vuetify.breakpoint.xs"
      v-model="snackbar"
    >
    {{ snackbarText }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SongsService from '@/services/SongsService'
import LyricsService from '@/services/LyricsService'
import BookmarksService from '@/services/BookmarksService'
import SongHistoryService from '@/services/SongHistoryService'
import UpdateSongDialog from './UpdateSong'

export default {
  data () {
    return {
      song: {},
      playerHeight: 300,
      fetchingLyrics: false,
      retrievedLyrics: {
        lyrics: null,
        url: null
      },
      lyricsFetchError: null,
      dialog: false,
      snackbar: false,
      gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      bookmark: null,
      snackbarText: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    '$route' (to, from) {
      if (from.params.songId !== to.params.songId) {
        this.setInitialView()
      }
    }
  },
  async mounted () {
    this.setInitialView()
    this.setPlayerHeight()

    if (this.isUserLoggedIn) {
      try {
        const songId = this.$store.state.route.params.songId
        const bookmarks = (await BookmarksService.index({
          songId: songId
        })).data

        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }

        SongHistoryService.post({
          songId: songId
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setInitialView () {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    },
    updateInfo (data) {
      this.song = data
      this.dialog = false
      this.snackbar = true
      this.snackbarText = 'Song updated'
    },
    async fetchLyrics () {
      try {
        if (!this.song.lyrics && !this.retrievedLyrics.lyrics && !this.fetchingLyrics) {
          this.fetchingLyrics = true
          const { title, artist } = this.song
          const { lyrics, url } = (await LyricsService.fetchLyrics(title, artist)).data

          this.retrievedLyrics.lyrics = lyrics
          this.retrievedLyrics.url = url

          this.lyricsFetchError = null
        }
      } catch (err) {
        this.lyricsFetchError = 'Unable to retrieve lyrics'
      }

      this.fetchingLyrics = false
    },
    async bookmarkSong () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
        this.snackbar = true
        this.snackbarText = 'Song added to bookmarks'
      } catch (err) {
        console.log(err)
      }
    },
    async unbookmarkSong () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
        this.snackbar = true
        this.snackbarText = 'Song removed from bookmarks'
      } catch (err) {
        console.log(err)
      }
    },
    setPlayerHeight () {
      // this function ensures that the player maintains a 16:9 aspect ratio on mount and resize
      const width = this.$refs.player.$el.clientWidth
      this.playerHeight = (width / 16) * 9
    }
  },
  components: {
    UpdateSongDialog
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
  width: 125px;
  height: 125px;
}

.album-image > img {
  height: 125px;
  border-radius: 2px;
}

.song-jumbotron {
  background-size: cover;
  background-position-y: center;
}

.no-grow {
  flex-grow: 0 !important;
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
