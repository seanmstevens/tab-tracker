<template>
  <v-card>
    <v-card-title
      class="grey lighten-4 py-4 title">
      Edit Song
    </v-card-title>
    <v-card-text>
      <v-container grid-list-sm>
        <v-form ref="form">
          <v-layout row wrap>
            <v-flex xs12>
              <v-subheader class="px-0">Song Metadata</v-subheader>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                @input.native="compareData($event)"
                color="blue"
                name="title"
                v-model="songInfo.title"
                :rules="rules.generic"
                label="Song title"
                placeholder="Fight the Power"
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                @input.native="compareData($event)"
                color="blue"
                name="artist"
                v-model="songInfo.artist"
                :rules="rules.generic"
                label="Artist"
                placeholder="Public Enemy"
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                @input.native="compareData($event)"
                color="blue"
                name="album"
                v-model="songInfo.album"
                :rules="rules.generic"
                label="Album"
                placeholder="Fear of a Black Planet"
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                @input.native="compareData($event)"
                color="blue"
                :items="genres"
                v-model="songInfo.genre"
                dense
                :rules="rules.generic"
                label="Genre"
                autocomplete
                hint="Select the most suitable genre for this song"
                persistent-hint
                required>
              </v-select>
            </v-flex>
            <v-flex xs12>
              <v-subheader class="px-0">Song Details + Media</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                @input.native="compareData($event)"
                color="blue"
                name="albumImageUrl"
                v-model="songInfo.albumImageUrl"
                :rules="rules.generic"
                label="Album image URL"
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                @input.native="compareData($event)"
                color="blue"
                name="youtubeUrl"
                v-model="songInfo.youtubeUrl"
                :rules="rules.generic"
                label="Youtube URL"
                hint='Or just paste in the video ID directly'
                persistent-hint
                required>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                @input.native="compareData($event)"
                color="blue"
                name="lyrics"
                v-model="songInfo.lyrics"
                label="Lyrics (optional)"
                placeholder="Enter song lyrics in this field"
                multi-line>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click.native="close"
        flat
        color="primary">
        Cancel
      </v-btn>
      <v-btn
        :disabled="!dataChanged"
        :loading="loading"
        @click.native="submit"
        flat>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  props: ['song'],
  data () {
    return {
      songInfo: Object.assign({}, this.song),
      dataChanged: false,
      valid: true,
      rules: {
        generic: [v => !!v || 'This field is required']
      },
      loading: false,
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
    submit () {
      if (this.$refs.form.validate()) {
        this.save()
        this.dataChanged = false
      }
    },
    reset () {
      this.songInfo = Object.assign(this.songInfo, this.song)
    },
    close () {
      this.reset()
      this.$emit('cancel')
    },
    compareData (event) {
      if (isEquivalent(this.songInfo, this.song)) {
        this.dataChanged = false
      } else {
        this.dataChanged = true
      }

      function isEquivalent (a, b) {
        const aProps = Object.keys(a)

        for (var i = 0; i < aProps.length; i++) {
          const propName = aProps[i]

          if (a[propName] !== b[propName]) {
            return false
          }
        }
        return true
      }
    },
    async save () {
      try {
        this.loading = true

        const song = (await SongsService.put(this.songInfo)).data
        this.$emit('update', song)

        this.loading = false
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
.album-image-preview > img {
  height: 75px;
  width: 75px;
}
</style>
