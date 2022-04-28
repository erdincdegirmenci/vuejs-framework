<template>
   <v-textarea
    v-model="inputVal"
    clearable
    clear-icon="mdi-close-circle"
    :label="this.GetLabel(this, placeholder)"
    :rules="isRequired ? textRules : []"
    :required="isRequired"
  ></v-textarea>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  name: 'dxFormTextareaInput',
  props: {
    readonly: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      require: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: true
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      textRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ],
      inputVal: ''
    }
  },
  validations () {
    return {
      inputVal: { required }
    }
  },
  watch: {
    inputVal: function (input) {
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
  methods: {
    validate: function () {
      if (this.isRequired && !this.disabled) {
        this.$v.inputVal.$touch()
        if (this.$v.inputVal.$invalid) {
          return false
        }
      }
    }
  }
}
</script>
