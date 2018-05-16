<template>
  <v-card>
    <v-toolbar
      card
      dense
      color="light-green"
      dark>
      <v-icon>refresh</v-icon>
      <v-toolbar-title>Viewing History</v-toolbar-title>
    </v-toolbar>
    <transition name="fade" mode="out-in">
      <v-flex
        key="loader"
        v-if="fetchingHistory"
        xs4
        class="mx-auto py-3">
        <v-layout column align-center>
          <v-progress-circular
            class="mb-2"
            :width="3"
            indeterminate
            color="light-green" />
          <small class="fetch-text">Fetching history...</small>
        </v-layout>
      </v-flex>
      <v-data-iterator
        v-else
        key="songs"
        :items="songs"
        :pagination.sync="pagination"
        no-data-text="You haven't viewed any songs yet"
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
          </v-list-tile>
        </template>
      </v-data-iterator>
    </transition>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  data () {
    return {
      fetchingHistory: true,
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

    this.fetchingHistory = false
  }
}
</script>

<style scoped>

</style>
