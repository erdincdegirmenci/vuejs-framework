<template>
     <VueCtkDateTimePicker id="TimePicker"
     v-model="yourValue"
     format="hh:mm a"
     formatted="hh:mm a"
     label="Seçiniz"
     inputSize="sm"
     :onlyTime=true
     :overlay=true
     :noLabel=true
     ></VueCtkDateTimePicker>
 </template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'

export default {
  name: 'dxFormTimepickerInput',
  components: {
    VueCtkDateTimePicker
  },
  props: {
    value: String,
    clear: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      yourValue: null
    }
  },
  watch: {
    yourValue (newValue) {
      this.$emit('input', newValue)
    },
    clear: function (input) {
      if (input) { this.yourValue = '' }
    }
  }
}
</script>

<style scoped>
.date-time-picker {
  width: 100px;
  margin: 0 0 0 5px;
  padding-left: 0;
}
</style>
