<template>
  <div>
    <nav class="topnav navbar navbar-light">
      <form class="form-inline mr-auto text-muted">
        <v-text-field
          :label="this.GetLabel(this, 'navbar_search')"
          prepend-inner-icon="mdi-select-search"
        ></v-text-field>
      </form>
      <ul class="nav">
        <li class="nav-item">
          <dxFormCombobox
            id="language_selection"
            :selectedValue="selectedLanguage"
            :items="languageList"
            @input="onLanguageChange"
          />
        </li>
        <li class="nav-item nav-notif">
          <a
            class="nav-link text-muted my-2"
            href="./#"
            data-toggle="modal"
            data-target=".modal-notif"
          >
            <span class="fe fe-bell fe-16"></span>
            <span class="dot dot-md bg-success"></span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-muted pr-0"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="avatar avatar-sm mt-2">
              <v-avatar size="30px">
                <img src="@/assets/images/avatars/face-1.jpg" alt="..." />
              </v-avatar>
            </span>
          </a>
          <div
            class="dropdown-menu dropdown-menu-left"
            style="padding: 0 0 0 0; min-width: 0"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <v-btn @click="openDialog" class="" small color="primary">{{
              GetLabel(this, "navbar_logout")
            }}</v-btn>
          </div>
        </li>
      </ul>
    </nav>
    <v-dialog v-model="dialogLogout" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{
          GetLabel(this, "navbar_logout_confirm")
        }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">{{
            GetLabel(this, "cancel")
          }}</v-btn>
          <v-btn color="blue darken-1" text @click="logOutConfirm">{{
            GetLabel(this, "ok")
          }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import constant from '@/library/constants/constants'
import { AUTH_LOGOUT } from '@/store/actions/auth'
import i18n from '@/library/plugins/i18n.js'

export default {
  name: 'nav-menu',
  mounted () {
    this.GetCurrentUser()
  },
  data () {
    return {
      drawer: false,
      dialog: false,
      dialogLogout: false,
      selectedLanguage: constant.language.TR,
      languageList: [
        { value: constant.language.TR, text: 'TR' },
        { value: constant.language.EN, text: 'EN' }
      ],
      currentUser: null,
      globalRoles: constant.role
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogLogout (val) {
      val || this.closeDialog()
    }
  },
  components: {
    dxFormCombobox: () =>
      import('Customcontrols/dxInput/dxFormCombobox/dxFormCombobox')
  },
  methods: {
    GetCurrentUser: function () {
      this.currentUser = this.$store.getters.currentUser
    },
    onLanguageChange: function (item) {
      i18n.locale = item
    },
    AuthorizationCheck: function (page) {
      return this.$store.getters.currentUser.Roles.includes(page)
    },
    LogOut: function () {
      this.$store.dispatch(AUTH_LOGOUT).then((response) => {
        this.$router.push('/login')
      })
    },
    logOutConfirm () {
      this.LogOut()
      this.closeDialog()
    },
    openDialog () {
      this.dialogLogout = true
    },
    closeDialog () {
      this.dialogLogout = false
    }
  }
}
</script>
