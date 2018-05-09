<template>
  <div id="app">
    <v-app>
      <page-header></page-header>
      <v-content>
        <v-container fluid fill-height>
          <router-view></router-view>
        </v-container>
      </v-content>
      <page-footer></page-footer>
    </v-app>
  </div>
</template>

<script>
import PageHeader from './components/Header'
import PageFooter from './components/Footer'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
</style>
