<template>
  <v-card>
    <v-toolbar
      card
      dense
      color="light-green"
      dark>
      <v-icon>refresh</v-icon>
      <v-toolbar-title>Viewing History</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-iterator
      :items="songs"
      :pagination.sync="pagination"
      no-data-text="No bookmarks found"
      content-tag="v-list"
      three-line>
      <template slot="item" slot-scope="props">
        <v-divider v-if="props.index !== 0" inset></v-divider>
        <v-list-tile
          :key="props.item.id"
          ripple
          :to="{
            name: 'song',
            params: {
              songId: props.item.id
            }
          }"
          avatar>
          <v-list-tile-avatar tile>
            <img :src="props.item.albumImageUrl" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="props.item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="props.item.artist"></v-list-tile-sub-title>
            <v-list-tile-sub-title v-html="props.item.album"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  data () {
    return {
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      songs: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.songs = (await SongHistoryService.index()).data
    }
  }
}
</script>

<style scoped>

</style>
