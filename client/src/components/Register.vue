<template>
  <v-layout row>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense dark color="primary">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <div class="pl-4 pr-4 pt-2 pb-2">
              <v-text-field
                name="email"
                v-model="email"
                label="Email"
              ></v-text-field>
              <v-text-field
                type="password"
                name="password"
                v-model="password"
                label="Password"
              ></v-text-field>
            <div class="error" v-html="error" />
            <div class="text-xs-center">
              <v-btn
                color="primary"
                @click="register">
                Register
              </v-btn>
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
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
