<template>
  <v-dialog
    v-model="$store.state.createDialogOpen"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="deep-purple">
        <v-btn icon dark @click.stop="closeDialog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Create New Song</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- <v-btn dark flat @click.stop="show = false">Save</v-btn> -->
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-container>
                  <v-subheader class="px-0">
                    Song Metadata
                  </v-subheader>
                  <v-text-field
                    color="blue"
                    name="title"
                    v-model="song.title"
                    :rules="rules.generic"
                    label="Song title"
                    placeholder="Fight the Power"
                    required>
                  </v-text-field>
                  <v-text-field
                    color="blue"
                    name="artist"
                    v-model="song.artist"
                    :rules="rules.generic"
                    label="Artist"
                    placeholder="Public Enemy"
                    required>
                  </v-text-field>
                  <v-text-field
                    color="blue"
                    name="album"
                    v-model="song.album"
                    :rules="rules.generic"
                    label="Album"
                    placeholder="Fear of a Black Planet"
                    required>
                  </v-text-field>
                  <v-select
                    color="blue"
                    :items="genres"
                    v-model="song.genre"
                    :rules="rules.generic"
                    dense
                    label="Genre"
                    autocomplete
                    hint="Select the most suitable genre for this song"
                    persistent-hint
                    required
                  ></v-select>
                </v-container>
              </v-flex>
              <v-flex xs12 md6>
                <v-container>
                  <v-subheader class="px-0">
                    Song Details + Media
                  </v-subheader>
                  <v-text-field
                    color="blue"
                    name="albumImageUrl"
                    v-model="song.albumImageUrl"
                    :rules="rules.generic"
                    label="Album image URL"
                    required>
                  </v-text-field>
                  <v-text-field
                    color="blue"
                    name="youtubeUrl"
                    v-model="song.youtubeUrl"
                    :rules="rules.generic"
                    label="Youtube URL"
                    hint='Or just paste in the video ID directly'
                    required>
                  </v-text-field>
                  <v-text-field
                    color="blue"
                    name="lyrics"
                    v-model="song.lyrics"
                    label="Lyrics (optional)"
                    placeholder="Enter song lyrics in this field"
                    multi-line>
                  </v-text-field>
                </v-container>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-btn
                :loading="loading"
                @click="submit"
                dark
                color="deep-purple">
                create song
              </v-btn>
              <v-slide-x-transition>
                <v-tooltip
                  v-if="!valid"
                  right>
                  <v-btn
                    slot="activator"
                    icon
                    class="my-0"
                    @click="clear">
                    <v-icon>refresh</v-icon>
                  </v-btn>
                  <span>Refresh form</span>
                </v-tooltip>
              </v-slide-x-transition>
            </v-card-actions>
            <div>
              <small>*indicates required field</small>
            </div>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      valid: true,
      rules: {
        generic: [v => !!v || 'This field is required']
      },
      loading: false,
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeUrl: null,
        lyrics: null,
        tab: null
      },
      genres: [
        'Acapella', 'Acoustic', 'Alternative', 'Alternative Rock', 'Ambient',
        'Avantgarde', 'Ballad', 'Bass', 'Big Band', 'Bluegrass', 'Blues', 'Celtic',
        'Christian Rap', 'Classic Rock', 'Classical', 'Club', 'Country', 'Dance',
        'Dance Hall', 'Death Metal', 'Disco', 'Easy Listening', 'Electronic',
        'Ethnic', 'Euro-Techno', 'Eurodance', 'Fast Fusion', 'Folk', 'Folk-Rock',
        'Funk', 'Fusion', 'Gangsta', 'Gospel', 'Gothic', 'Gothic Rock', 'Grunge',
        'Hard Rock', 'Hip-Hop', 'House', 'Industrial', 'Instrumental',
        'Instrumental Rock', 'Jazz', 'Jazz/Funk', 'Latin', 'Lo-Fi', 'Metal',
        'New Age', 'New Wave', 'Noise', 'Oldies', 'Opera', 'Other', 'Polka', 'Pop',
        'Pop/Funk', 'Progressive Rock', 'Psychadelic', 'Punk', 'R&B', 'Rap', 'Reggae',
        'Retro', 'Rock', 'Rock & Roll', 'Samba', 'Ska', 'Soul', 'Soundtrack',
        'Swing', 'Symphony', 'Tango', 'Techno', 'Trance', 'Trip-Hop', 'Vocal'
      ]
    }
  },
  methods: {
    closeDialog () {
      this.$store.dispatch('toggleCreateSongDialog')
      this.clear()
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.createSong()
      }
    },
    clear () {
      this.$refs.form.reset()
    },
    async createSong () {
      try {
        this.loading = true

        const song = (await SongsService.post(this.song)).data

        this.$router.push({
          name: 'song',
          params: {
            songId: song.id
          }
        })

        setTimeout(() => {
          this.loading = false
          this.closeDialog()
        }, 375)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
