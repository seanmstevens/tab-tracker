<template>
  <v-toolbar fixed scroll-off-screen :scroll-threshold="300" color="primary" dark app>
    <v-toolbar-side-icon
      v-if="$vuetify.breakpoint.smAndDown"
      @click="openDrawer">
    </v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link
      :to="{ name: 'songs' }"
      tag="span"
      class="home mr-4">
      TabTracker
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        flat
        dark
        :to="{name: 'songs'}">
        <span>Browse</span>
      </v-btn>
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        flat
        dark
        @click="openDialog">
        <span>Add Song</span>
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn && $vuetify.breakpoint.smAndUp"
        flat
        dark
        :to="{name: 'login'}">
        <span>Login</span>
      </v-btn>

      <v-btn
        v-if="!$store.state.isUserLoggedIn && $vuetify.breakpoint.smAndUp"
        flat
        dark
        :to="{name: 'register'}">
        <span>Sign Up</span>
      </v-btn>

      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        @click="logout">
        <span v-if="$vuetify.breakpoint.smAndUp">Logout</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    openDialog () {
      this.$store.dispatch('toggleCreateSongDialog')
    },
    openDrawer () {
      this.$store.dispatch('toggleNavDrawer')
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)

      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
</style>
