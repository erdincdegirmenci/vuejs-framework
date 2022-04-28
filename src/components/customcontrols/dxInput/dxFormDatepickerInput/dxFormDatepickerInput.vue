<template>
  <v-row>
    <v-col cols="12" sm="12">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="yourValue"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-if="isRequired"
            v-model="yourValue"
            :label="GetLabel(this, placeholder)"
            prepend-icon="mdi-calendar"
            readonly
            :disabled="disabled"
            v-bind="attrs"
            v-on="on"
            :outlined="hasBorder ? true : false"
            :rules="isRequired ? textRules : []"
            :required="isRequired"
          ></v-text-field>
        </template>
        <v-date-picker
          type="date"
          v-model="yourValue"
          :picker-date.sync="yourValue"
          :min-date="minDate"
          :max-date="maxDate"
          :error="!dateIsValid || !dateIsValidForFQ"
          @change="checkDateIsValid(yourValue)"
          max="9999-12-31"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(yourValue)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
  </v-row>
</template>

<script>
import CustomDateFormatter from '@/library/helpers/customdateformatter'
export default {
  name: 'dxFormDatepickerInput',
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      required: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    minDate: {
      type: String
    },
    maxDate: {
      type: String
    },
    clear: {
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
  data: function () {
    return {
      yourValue: '',
      dateIsValid: true,
      dateIsValidForFQ: true,
      menu: false,
      textRules: [
        (v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '
      ]
    }
  },
  created () {
    this.yourValue = this.$props.value
  },
  watch: {
    yourValue (newValue) {
      if (newValue) {
        this.$emit('input', CustomDateFormatter.GetDate(new Date(newValue)).toString())
      } else {
        this.$emit('input', null)
      }
    },
    clear: function (input) {
      if (input) {
        this.yourValue = null
      }
    }
  },
  methods: {
    checkDateIsValid: function () {
      if (this.isRequired && !this.disabled) {
        if (this.yourValue == null || this.yourValue === '') {
          this.dateIsValid = false
          return false
        } else {
          this.dateIsValid = true
          return true
        }
      } else {
        this.dateIsValid = true
        return true
      }
    },
    checkDateIsValidForFQ: function (date) {
      if (this.isRequired) {
        if (date) {
          this.dateIsValidForFQ = true
          return true
        } else {
          this.dateIsValidForFQ = false
          return false
        }
      } else {
        this.dateIsValidForFQ = true
        return true
      }
    }
  }
}
</script>

<style scoped>
.form-control {
  width: 197px;
  margin: 0;
  padding-left: 0;
  text-transform: uppercase;

  padding: 0 15px;
}
.sd-container {
  position: relative;
  float: left;
}

.sd {
  padding: 5px 10px;
  height: 30px;
  width: 150px;
}

.open-button {
  position: absolute;
  top: 5px;
  right: 11px;
  width: 25px;
  height: 25px;
  background: #fff;
  pointer-events: none;
}

.open-button button {
  border: none;
  background: transparent;
}
</style>
