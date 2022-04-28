<template>
  <v-app id="app">
    <router-view />
    <v-overlay :value="overlay" :z-index="zIndex">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Axios from 'axios'
import { AUTH_ISLOGIN } from '@/store/actions/auth'
import AuthHelper from 'Helpers/authhelper'
export default {
  data: () => ({
    overlay: true,
    zIndex: 999
  }),
  mounted () {

  },
  created () {
    this.overlay = false
    const ui = AuthHelper.GetUser()
    if (ui) {
      this.$store.dispatch(AUTH_ISLOGIN).then(response => {
        this.overlay = false
      })
    }

    Axios.interceptors.request.use(
      (config) => {
        this.overlay = true
        return config
      },
      (error) => {
        this.overlay = false
        return Promise.reject(error)
      }
    )

    Axios.interceptors.response.use(
      (response) => {
        this.overlay = false
        return response
      },
      (error) => {
        this.overlay = false
        return Promise.reject(error)
      }
    )
  }
}
</script>
