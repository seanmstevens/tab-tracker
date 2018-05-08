<template>
  <v-layout row>
    <v-flex xs12 sm8 md4 class="mx-auto">
      <div class="spacer-container">
        <div class="white elevation-2">
          <v-toolbar flat dense dark color="primary">
            <v-toolbar-title class="registration-title">Login</v-toolbar-title>
          </v-toolbar>
          <div class="px-4 py-2">
            <v-text-field
              color="blue"
              name="email"
              v-model="email"
              label="Email"
            ></v-text-field>
            <v-text-field
              color="blue"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'text' : 'password'"
              name="password"
              v-model="password"
              label="Password"
            ></v-text-field>
            <v-alert
              v-model="alert"
              type="error"
              dismissible
              transition="slide-y-reverse-transition">
              <div v-html="error" />
            </v-alert>
            <div class="text-xs-center">
              <v-btn
                color="primary"
                @click="login">
                Login
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      alert: false,
      e1: false,
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
        this.alert = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .registration-title {
    font-weight: 300;
  }

  .spacer-container {
    padding-top: 75px;
  }
</style>
