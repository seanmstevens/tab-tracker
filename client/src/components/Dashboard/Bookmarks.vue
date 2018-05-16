<template>
  <v-card>
    <v-toolbar
      card
      dense
      color="warning"
      light>
      <v-icon>collections_bookmark</v-icon>
      <v-toolbar-title>Bookmarks</v-toolbar-title>
    </v-toolbar>
    <v-flex v-if="!isUserLoggedIn" class="py-3 text-xs-center">
      <span>Log in to start adding bookmarks!</span>
    </v-flex>
    <transition v-else name="fade" mode="out-in">
      <v-flex
        key="loader"
        v-if="fetchingBookmarks"
        xs4
        class="mx-auto py-3">
        <v-layout column align-center>
          <v-progress-circular
            class="mb-2"
            :width="3"
            indeterminate
            color="warning" />
          <small class="fetch-text">Fetching bookmarks...</small>
        </v-layout>
      </v-flex>
      <v-data-iterator
        key="bookmarks"
        v-else
        :items="bookmarks"
        :pagination.sync="pagination"
        no-data-text="No bookmarks found"
        content-tag="v-list"
        two-line>
        <template slot="item" slot-scope="props">
          <v-divider v-if="props.index !== 0" inset></v-divider>
          <v-list-tile
            :key="props.item.id"
            ripple
            :to="{
              name: 'song',
              params: {
                songId: props.item.SongId
              }
            }"
            avatar>
            <v-list-tile-avatar tile>
              <img :src="props.item.albumImageUrl" class="small-album-preview"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="props.item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="props.item.artist"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action
              :id="props.item.id"
              @click.prevent="removeBookmark(props.item.id)">
              <v-tooltip left>
                <v-btn small icon slot="activator">
                  <v-icon color="red">remove_circle</v-icon>
                </v-btn>
                <span>Remove bookmark</span>
              </v-tooltip>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-data-iterator>
    </transition>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      fetchingBookmarks: true,
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    async removeBookmark (id) {
      try {
        const removedBookmark = (await BookmarksService.delete(id)).data
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== removedBookmark.id)
        // this.snackbar = true
        // this.snackbarText = 'Song removed from bookmarks'
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
      this.fetchingBookmarks = false
    }
  }
}
</script>

<style scoped>

</style>
