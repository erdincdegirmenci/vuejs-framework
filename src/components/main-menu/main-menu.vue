<template>
  <div id="menu">
    <div id="menu__logo">
      <img src="@/assets/images/legaltech-logo.png" alt="DefineX" />
    </div>
    <h3>VUE Template</h3> 
    <nav>
      <router-link
        v-if="AuthorizationCheck(globalRoles.Management)" :to="{ name: 'Management'}">
        <i class="fal fa-cog"></i>
        <span>Yönetim</span>
      </router-link>
    </nav>
    <div id="menu__profile">
      <i class="fal fa-user"></i>
      <p id="menu__profile__name">{{this.$store.getters.currentUser.UserName}}</p>
      <button type="button" class="btn white" @click="Logout()">Çıkış</button>
    </div>
  </div>
</template>

<script>
import constant from '@/library/constants/constants'

export default {
  name: 'main-menu',
  mounted () {
    this.GetCurrentUser()
  },
  data () {
    return {
      currentUser: null,
      globalRoles: constant.role
    }
  },
  methods: {
    GetCurrentUser: function () {
      this.currentUser = this.$store.getters.currentUser
    },
    AuthorizationCheck: function (page) {
      return this.$store.getters.currentUser.Roles.includes(page)
    },
    Logout: function () {
      this.$router.push('/logout')
    }
  }
}
</script>
