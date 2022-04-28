<template>
  <v-form
    class="col-lg-3 col-md-4 col-10 mx-auto text-center"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container>
      <v-row>
        <v-col
          id="login__logo"
          cols="12"
          md="12"
          class="d-flex flex-column justify-space-between align-center">
          <v-img
            lazy-src="@/assets/images/legaltech-logo.png"
            alt="Legal Tech"
            max-width="300px"
            src="@/assets/images/legaltech-logo.png"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="pa-0 ma-0">
          <dxFormTextInput
            id="login_username"
            v-model="UserName"
            ref="usernameComponentRef"
            placeholder="email"
            :clear="true"
            type="email"
            :isRequired="true"
            :hasBorder=true
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="pa-0 ma-0">
          <dxFormTextInput
            id="login_password"
            type="password"
            ref="passwordComponentRef"
            v-model="Password"
            placeholder="password"
            :clear="true"
            :isRequired="true"
            :hasBorder=true
          />
        </v-col>
      </v-row>
      <v-row align="center" v-if="this.LoginFailedCount >= 3 && captchaIsActive">
        <v-col cols="12" md="12" class="pa-0 ma-0">
          <vue-recaptcha ref="recaptcha" @verify="onVerify" @expired="onExpired" :sitekey="captchaSiteKey">
          </vue-recaptcha>
          <div class="g-recaptcha" :data-sitekey="captchaSiteKey"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" class="pa-0 ma-0">
          <dxFormCheckboxInput
            id="login_remember_me"
            label="Remember Me!"
            :checked="RememberMe"
            ref="checkboxComponentRef"
            @input="onCheckRemember"
            :hasBorder=true
          />
        </v-col>
        <v-col cols="12" md="6" class="pa-0 ma-0">
          <v-btn
            :disabled="!valid"
            color="btn btn-lg primary btn-block"
            @click="login"
          >
            {{ GetLabel(this, "authentication_login") }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="mt-5 p-0">
          <p class="col-6 h6 p-0 mb-3 float-left text-left">
            <a href="/forgetpassword"
              ><span class="item-text">{{
                GetLabel(this, "authentication_login_forget_password")
              }}</span></a
            >
          </p>
          <p class="col-6 h6 p-0 mb-3 float-right text-right">
            {{ GetLabel(this, "authentication_login_dont_have_account") }}
            <a href="/register"
              ><span class="item-text">{{
                GetLabel(this, "authentication_register")
              }}</span></a
            >
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <p class="mb-3 p-0 text-muted text-center">
            © {{ new Date().getFullYear() }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import dxFormTextInput from 'Customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import { AUTH_REQUEST } from '@/store/actions/auth'
import VueRecaptcha from 'vue-recaptcha'
import configStore from '@/library/helpers/configStore'
import dxFormCheckboxInput from 'Customcontrols/dxInput/dxFormCheckboxInput/dxFormCheckboxInput'
export default {
  name: 'login',
  data () {
    return {
      valid: true,
      UserName: localStorage.getItem('UserName'),
      Password: '',
      RememberMe: localStorage.getItem('RememberMe') === 'true',
      LoginFailedCount: 0,
      recaptchaToken: '',
      captchaSiteKey: configStore.settings.captchaSiteKey,
      captchaIsActive: configStore.settings.isCapcthaVisible,
      alertoptions: {
        okText: this.GetLabel(this, 'ok')
      }
    }
  },
  components: {
    dxFormTextInput,
    dxFormCheckboxInput,
    VueRecaptcha
  },

  created () {
    localStorage.setItem('LFCount', 0)
  },

  mounted () {
    const externalScript = document.createElement('script')
    externalScript.setAttribute('src', configStore.settings.capcthaUrl)
    document.head.appendChild(externalScript)
  },

  methods: {
    login () {
      if (!this.$refs.form.validate()) {
        return
      }
      this.onCheckRemember()
      const request = {
        UserName: this.$refs.usernameComponentRef.inputVal,
        Password: this.$refs.passwordComponentRef.inputVal,
        RecaptchaToken: this.recaptchaToken
      }
      this.$store
        .dispatch(AUTH_REQUEST, request)
        .then((response) => {
          this.$router.push('/')
          localStorage.setItem('LFCount', 0)
        })
        .catch((errorCode) => {
          this.LoginFailedCount++
          localStorage.setItem('LFCount', this.LoginFailedCount)
          this.$dialog.alert(
            this.GetErrorMessage(this, errorCode),
            this.alertoptions
          )
        })
    },
    onCheckRemember: function () {
      if (
        this.$refs.checkboxComponentRef.data === true &&
        this.UserName != null &&
        this.Password != null
      ) {
        localStorage.setItem('UserName', this.UserName)
        localStorage.setItem('RememberMe', this.$refs.checkboxComponentRef.data)
      } else {
        localStorage.removeItem('UserName')
        localStorage.removeItem('RememberMe')
      }
    },
    onVerify: function (response) {
      this.recaptchaToken = response
    },
    onExpired: function () {
      this.resetRecaptcha()
    },
    resetRecaptcha () {
      this.$refs.recaptcha.reset()
      this.recaptchaToken = ''
    }
  }
}
</script>
