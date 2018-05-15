<template>
  <v-navigation-drawer
    v-model="$store.state.drawerOpen"
    fixed
    app>
    <v-list>
      <v-list-tile exact :to="{ name: 'root' }" ripple>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile exact :to="{ name: 'songs' }" ripple>
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Browse</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
