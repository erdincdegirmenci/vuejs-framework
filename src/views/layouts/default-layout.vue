<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <LeftMenu />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <NavBar />
    </v-app-bar>

    <v-main>
      <div style="padding: 10px 20px 0px 20px">
        <router-view></router-view>
      </div>
    </v-main>

    <v-footer app> </v-footer>
  </v-app>
</template>

<script>
import LeftMenu from '@/components/left-menu/left-menu'
import NavBar from '@/components/nav-bar/nav-bar'

export default {
  name: 'DefaultLayout',
  components: {
    LeftMenu,
    NavBar
  },
  data: function () {
    return {
      message: 'Lütfen Bekleyin',
      drawer: null
    }
  }
}
</script>
