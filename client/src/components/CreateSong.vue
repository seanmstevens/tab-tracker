<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.stop="show = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Create New Song</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.stop="show = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md6>
              <v-container>
                <v-subheader class="px-0">
                  General Song Info
                </v-subheader>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>
                      Title
                    </v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      color="blue"
                      name="title"
                      v-model="title"
                      label="Song title"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-text-field
                  color="blue"
                  name="artist"
                  v-model="artist"
                  label="Artist"
                  required>
                </v-text-field>
                <v-text-field
                  color="blue"
                  name="album"
                  v-model="album"
                  label="Album"
                  required>
                </v-text-field>
                <v-select
                  color="blue"
                  :items="genres"
                  v-model="genre"
                  label="Genre"
                  single-line
                  auto
                  hint="Select the most suitable genre for this song"
                  persistent-hint
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
                  name="title"
                  v-model="title"
                  label="Song title"
                  required>
                </v-text-field>
                <v-text-field
                  color="blue"
                  name="artist"
                  v-model="artist"
                  label="Artist"
                  required>
                </v-text-field>
                <v-text-field
                  color="blue"
                  name="youtubeId"
                  v-model="youtubeId"
                  label="Youtube ID"
                  hint='Everything after "v=" in the YouTube URL'
                  required>
                </v-text-field>
                <v-select
                  :items="genres"
                  v-model="genre"
                  label="Genre"
                  single-line
                  auto
                  hint="Select the most suitable genre for this song"
                  persistent-hint
                  required
                ></v-select>
              </v-container>
            </v-flex>
            <small>*indicates required field</small>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['visible'],
  data () {
    return {
      dialog: false,
      title: null,
      artist: null,
      genre: null,
      album: null,
      albumImageUrl: null,
      youtubeId: null,
      lyrics: null,
      tab: null,
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
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
