<template>
  <div>
    <v-form
      class="col-lg-3 col-md-4 col-10 mx-auto text-center"
      ref="form"
      v-model="valid"
      lazy-validation
      v-if="activeTemplate === 'form'"
    >
      <v-container>
        <v-row>
          <v-col
            id="login__logo"
            cols="12"
            md="12"
            class="d-flex flex-column justify-space-between align-center"
          >
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
            <v-btn
              :disabled="!valid"
              style="width:100%"
              color="btn btn-lg primary btn-block"
              @click="forgotpassword"
            >
              {{ GetLabel(this, "authentication_forgot_send") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" class="mt-5 p-0">
            <p class="col-6 h6 p-0 mb-3 float-left text-left">
              {{
                GetLabel(this, "authentication_register_already_have_account")
              }}
              <a href="/login"
                ><span class="item-text">{{
                  GetLabel(this, "authentication_login")
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
    <successPage
      :text="SuccessMesage"
      :visible="this.activeTemplate === 'success'"
    ></successPage>
  </div>
</template>

<script>
import dxFormTextInput from 'Customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import { FORGOT_REQUEST } from '@/store/actions/auth'
import successPage from '@/components/partialpages/success-page'

export default {
  name: 'forgetPassword',
  data () {
    return {
      valid: true,
      UserName: '',
      activeTemplate: 'form',
      SuccessMesage: this.GetLabel(
        this,
        'authentication_forgot_sucess_message'
      ),
      alertoptions: {
        okText: this.GetLabel(this, 'ok')
      }
    }
  },
  components: {
    dxFormTextInput,
    successPage
  },

  created () {
  },

  methods: {
    forgotpassword () {
      if (!this.$refs.form.validate()) {
        return
      }
      const request = {
        UserName: this.$refs.usernameComponentRef.inputVal
      }
      this.$store
        .dispatch(FORGOT_REQUEST, request)
        .then((response) => {
          this.activeTemplate = 'success'
        })
        .catch((errorCode) => {
          this.activeTemplate = 'success'
          this.SuccessMesage = this.GetErrorMessage(this, errorCode)
        })
    }
  }
}
</script>
