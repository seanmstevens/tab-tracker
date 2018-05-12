<template>
  <v-toolbar fixed scroll-off-screen :scroll-threshold="300" color="primary" dark app>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title
      @click="navigateTo({name: 'root'})"
      class="home mr-4">
      TabTracker
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat
        dark
        :to="{name: 'songs'}">
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{name: 'login'}">
        Login
      </v-btn>

      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{name: 'register'}">
        Sign Up
      </v-btn>

      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)

      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    cursor: pointer;
  }
</style>
