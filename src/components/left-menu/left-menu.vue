<template>
  <div class="vertnav navbar navbar-light">
    <div id="menu__logo">
      <v-img
        lazy-src="@/assets/images/legaltech-logo.png"
        max-height="85"
        max-width="220"
        src="@/assets/images/legaltech-logo.png"
        alt="Legal Tech Logo"
      ></v-img>
    </div>
    <v-list nav dense>
      <v-list-item-group class="mb-2" color="primary">
        <router-link :to="{ name: 'Home' }" class="nav-link">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              this.GetLabel(this, "leftmenu_dashboard")
            }}</v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link :to="{ name: 'Correspondence' }" class="nav-link">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              GetLabel(this, "leftmenu_correspondence")
            }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import constant from "@/library/constants/constants";

export default {
  name: "left-menu",
  mounted() {
    this.GetCurrentUser();
  },
  data() {
    return {
      currentUser: null,
      globalRoles: constant.role,
    };
  },
  methods: {
    GetCurrentUser: function () {
      this.currentUser = this.$store.getters.currentUser;
    },
    AuthorizationCheck: function (page) {
      if (this.$store.getters.currentUser) {
        return this.$store.getters.currentUser.Roles.includes(page);
      } else {
        return false;
      }
    },
    Logout: function () {
      this.$router.push("/logout");
    },
  },
};
</script>
