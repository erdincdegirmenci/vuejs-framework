<template>
<div>
     <VueCtkDateTimePicker id="TimePicker"
     v-model="yourValue"
     format="hh:mm a"
     formatted="hh:mm a"
     label="Seçiniz"
     inputSize="sm"
     :onlyTime=true
     :overlay=true
     :noLabel=true
      @is-hidden="checkTimeIsValid(yourValue)"
     />
     <span
      v-if="!timeIsValid"
      class="form-text text-danger"
    >*Bu alan zorunludur.</span>
</div>
 </template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

export default {
  name: 'dxFormTimepickerInputForIP',
  components: {
    VueCtkDateTimePicker
  },
  props: {
    value: String,
    isRequired: Boolean,
    clear: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      yourValue: null,
      timeIsValid: true
    }
  },
  watch: {
    yourValue (newValue) {
      this.$emit('input', newValue)
    },
    clear: function (input) {
      if (input) { this.yourValue = '' }
    }
  },
  methods: {
    checkTimeIsValid: function () {
      if (this.$props.isRequired) {
        if (this.yourValue) {
          this.timeIsValid = true
          return true
        } else {
          this.timeIsValid = false
          return false
        }
      }
    }
  }
}
</script>

<style scoped>
.date-time-picker {
  width: 200px;
  padding-left: 0;
  margin-left: 0% !important;
}
</style>
