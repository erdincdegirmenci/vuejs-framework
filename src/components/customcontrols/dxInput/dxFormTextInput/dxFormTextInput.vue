<template>
  <div>
    <v-text-field
      v-if="
        this.$props.type !== 'password' &&
        this.$props.type !== 'email'
      "
      :id="id"
      @blur="validate()"
      v-model="inputVal"
      :label="this.GetLabel(this, placeholder)"
      borderType
      clearable
      :rules="isRequired ? textRules : []"
      :required="isRequired"
      :disabled="disabled"
      :outlined="hasBorder ? true : false"
    ></v-text-field>
    <v-text-field
      v-if="type === 'email'"
      :id="id"
      @blur="validate()"
      v-model="inputVal"
      :label="this.GetLabel(this, placeholder)"
      clearable
      :required="isRequired"
      :rules="isRequired ? emailRules : []"
      :disabled="disabled"
      :outlined="hasBorder ? true : false"
    ></v-text-field>
    <v-text-field
      v-if="type === 'password'"
      :id="id"
      @blur="validate()"
      v-model="inputVal"
      :label="this.GetLabel(this, placeholder)"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show = !show"
      :type="show ? 'text' : 'password'"
      clearable
      :required="isRequired"
      :rules="isRequired ? passwordRules : []"
      :disabled="disabled"
      :outlined="hasBorder ? true : false"
    ></v-text-field>
    <span v-if="!phoneIsValid" class="form-text text-danger">
      *{{ this.GetLabel(this, "wrong_phone_format") }}
    </span>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  name: 'dxFormTextInput',
  props: {
    value: String,
    inputType: String,
    id: {
      type: String,
      required: false,
      default: ''
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    labelText: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: false
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    isPhone: {
      type: Boolean,
      required: false,
      default: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      inputVal: '',
      phoneIsValid: true,
      showRequired: false,
      show: false,
      textRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ],
      emailRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' ',
        (v) =>
          /.+@.+/.test(v) ||
          '*' + this.GetLabel(this, 'wrong_email_format') + ' '
      ],
      passwordRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ],
      captchaRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ]
    }
  },
  validations () {
    if (this.type === 'email') {
      return {
        inputVal: { required, email }
      }
    } else {
      return {
        inputVal: { required }
      }
    }
  },
  watch: {
    inputVal: function (input) {
      if (input) {
        if (this.isPhone) {
          this.phonenumber(input)
        } else {
          this.phoneIsValid = true
        }
      } else {
        this.phoneIsValid = true
      }

      this.$emit('input', input)
    },
    value: {
      handler: function (input) {
        this.inputVal = input
      },
      immediate: true
    },
    clear: function (input) {
      if (input) {
        this.inputVal = ''
      }
    }
  },
  created () {
    this.inputVal = this.value
  },
  methods: {
    phonenumber: function (inputVal) {
      var phoneno = /^[5]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/
      if (!inputVal.match(phoneno)) {
        this.phoneIsValid = false
      } else {
        this.phoneIsValid = true
      }
    },
    validate: function () {
      if (this.isRequired && !this.disabled) {
        this.$v.inputVal.$touch()
        if (this.$v.inputVal.$invalid || !this.phoneIsValid) {
          return false
        } else {
          if (this.type === 'email') {
            this.validEmail(this.$v.inputVal.email)
            return this.$v.inputVal.email
          } else {
            return true
          }
        }
      } else {
        return false
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  }
}
</script>
