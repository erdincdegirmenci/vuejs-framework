<template>
  <div>
    <v-form
      class="col-lg-6 col-md-8 col-10 mx-auto"
      ref="registerForm"
      v-model="valid"
      lazy-validation
      v-if="activeTemplate === 'form'"
    >
      <v-container>
        <v-row>
          <v-col
            id="login__logo"
            col="12"
            md="12"
            class="d-flex flex-column justify-space-between align-center"
          >
             <v-img
            lazy-src="@/assets/images/legaltech-logo.png"
            alt="Legal Tech"
            max-width="300px"
            src="@/assets/images/legaltech-logo.png"></v-img>
          </v-col>
        </v-row>

        <hr class="my-4" />

        <v-row>
          <v-col cols="12" sm="6">
            <dxFormTextInput
              id="name"
              ref="userNameRef"
              v-model="Name"
              placeholder="authentication_register_user_name"
              :clear="true"
              :isRequired="true"
              :hasBorder=true
            />
          </v-col>

          <v-col cols="12" sm="6">
            <dxFormTextInput
              id="surname"
              ref="userSurnameRef"
              v-model="Surname"
              placeholder="authentication_register_user_surname"
              :clear="true"
              :isRequired="true"
              :hasBorder=true
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12">
            <dxFormTextInput
              id="email"
              ref="emailRef"
              type="email"
              v-model="UserName"
              placeholder="authentication_register_email"
              :clear="true"
              :isEmail="true"
              :isRequired="true"
              :hasBorder=true
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" md="12">
                <dxFormTextInput
                  id="password"
                  ref="passwordRef"
                  type="password"
                  v-model="Password"
                  placeholder="password"
                  :clear="true"
                  :isRequired="true"
                  @input="password_check"
                  :hasBorder=true
                />
              </v-col>
              <v-col cols="12" md="12">
                <dxFormTextInput
                  id="confirm_password"
                  ref="confirmPasswordRef"
                  type="password"
                  v-model="ConfirmPassword"
                  placeholder="confirm_password"
                  :clear="true"
                  :isRequired="true"
                  :hasBorder=true
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <div style="margin-left: 15px; margin-top: -5px">
              <p class="mb-2">
                {{ GetLabel(this, "authentication_password_requirement") }}
              </p>
              <ul class="small text-muted pl-4 mb-0">
                <li
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': has_uppercase }"
                >
                  <i
                    class="frmIcon fas"
                    :class="has_uppercase ? 'fa-check' : 'fa-times'"
                  ></i>
                  {{
                    GetLabel(
                      this,
                      "authentication_password_requirement_at_least_one_capital_letter"
                    )
                  }}
                </li>
                <li
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': has_lowercase }"
                >
                  <i
                    class="frmIcon fas"
                    :class="has_lowercase ? 'fa-check' : 'fa-times'"
                  ></i>
                  {{
                    GetLabel(
                      this,
                      "authentication_password_requirement_at_least_one_small_letter"
                    )
                  }}
                </li>
                <li
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': min_eight_char }"
                >
                  <i
                    class="frmIcon fas"
                    :class="min_eight_char ? 'fa-check' : 'fa-times'"
                  ></i>
                  {{
                    GetLabel(
                      this,
                      "authentication_password_requirement_at_least_eight_character"
                    )
                  }}
                </li>
                <li
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': max_fifteen_char }"
                >
                  <i
                    class="frmIcon fas"
                    :class="max_fifteen_char ? 'fa-check' : 'fa-times'"
                  ></i>
                  {{
                    GetLabel(
                      this,
                      "authentication_password_requirement_at_least_max_fifteen_character"
                    )
                  }}
                </li>
                <li
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': has_special }"
                >
                  <i
                    class="frmIcon fas"
                    :class="has_special ? 'fa-check' : 'fa-times'"
                  ></i>
                  {{
                    GetLabel(
                      this,
                      "authentication_password_requirement_at_least_one_special_character"
                    )
                  }}
                </li>
                <li
                  class="frmValidation"
                  :class="{ 'frmValidation--passed': has_number }"
                >
                  <i
                    class="frmIcon fas"
                    :class="has_number ? 'fa-check' : 'fa-times'"
                  ></i>
                  {{
                    GetLabel(
                      this,
                      "authentication_password_requirement_at_least_one_number"
                    )
                  }}
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
        <hr class="my-4" />
        <v-row>
          <v-col cols="12" md="12">
          <v-btn
            :disabled="!valid"
            x-large
            color="btn btn-lg primary btn-block"
            style="width:100%"
            @click="register"
          >
            {{ GetLabel(this, "authentication_register") }}
          </v-btn>
          </v-col>
        </v-row>
        <hr class="my-4" />
        <v-row>
          <v-col cols="12" md="12">
            <p class="col-6 h6 p-0 mb-3 float-right text-right">
              {{
                GetLabel(this, "authentication_register_already_have_account")
              }}
              <a href="/login"
                ><span class="item-text">{{
                  GetLabel(this, "authentication_login")
                }}</span></a
              >
            </p>
            <p class="col-6 mb-3 p-0 float-left text-muted text-center">
              © {{ new Date().getFullYear() }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <successPage
      :text='SuccessMesage'
      :visible="this.activeTemplate === 'success'"
    ></successPage>
  </div>
</template>

<script>
import dxFormTextInput from 'Customcontrols/dxInput/dxFormTextInput/dxFormTextInput'
import { REGISTER_REQUEST } from '@/store/actions/auth'
import successPage from '@/components/partialpages/success-page'

export default {
  name: 'register',
  data () {
    return {
      valid: true,
      Name: '',
      Surname: '',
      UserName: '',
      Password: '',
      ConfirmPassword: '',
      activeTemplate: 'form',
      alertoptions: {
        okText: this.GetLabel(this, 'ok')
      },
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      min_eight_char: false,
      max_fifteen_char: false,
      SuccessMesage: this.GetLabel(this, 'authentication_register_sucess_message')
    }
  },
  components: {
    dxFormTextInput,
    successPage
  },

  methods: {
    register () {
      if (!this.$refs.registerForm.validate()) {
        return
      }

      if (
        !this.has_number &&
        !this.has_lowercase &&
        !this.has_uppercase &&
        !this.has_special &&
        !this.min_eight_char &&
        !this.max_fifteen_char
      ) {
        this.$dialog.alert(
          this.GetMessage(this, 'password_requirements_not_match'),
          this.alertoptions
        )
        return
      }

      if (this.Password !== this.ConfirmPassword) {
        this.$dialog.alert(
          this.GetMessage(this, 'passwords_does_not_match'),
          this.alertoptions
        )
        return
      }
      const request = {
        Name: this.Name,
        Surname: this.Surname,
        UserName: this.UserName,
        Password: this.Password,
        UserType: 'client'
      }
      this.$store
        .dispatch(REGISTER_REQUEST, request)
        .then((response) => {
          this.activeTemplate = 'success'
        })
        .catch((errorCode) => {
          this.$dialog.alert(
            this.GetErrorMessage(this, errorCode),
            this.alertoptions
          )
        })
    },
    password_check: function () {
      this.has_number = /\d/.test(this.Password)
      this.has_lowercase = /[a-z]/.test(this.Password)
      this.has_uppercase = /[A-Z]/.test(this.Password)
      this.has_special = /[!@#\$%\^\&*\)\(+=._-]/.test(this.Password)
      this.min_eight_char = !(this.Password.length < 8)
      this.max_fifteen_char = !(this.Password.length > 15)
    }
  }
}
</script>
<style>
.frmValidation {
  font-size: 13px;
}
.frmValidation--passed {
  color: #2dca96;
}
.frmIcon {
  color: #eb0029;
}
.frmValidation--passed .frmIcon {
  color: #2dca96;
}
</style>
