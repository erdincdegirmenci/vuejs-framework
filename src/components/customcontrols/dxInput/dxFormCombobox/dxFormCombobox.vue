<template>
  <v-select
    style="width: 100%"
    v-if="!multiple"
    @blur="validate()"
    v-model="selectedItem"
    :items="items"
    :label="this.GetLabel(this, placeholder)"
    :outlined="hasBorder"
    :clearable="clear"
    :disabled="disabled"
    :options="selectedItem"
    :required="isRequired"
    :rules="isRequired ? rules.select:[]"
    :placeholder="this.GetLabel(this, placeholder)"
  ></v-select>
  <v-select
    v-else
    multiple
    @blur="validate()"
    v-model="selectedItem"
    :items="items"
    :key="items.value"
    :text="items.text"
    :value="items.value"
    :label="this.GetLabel(this, placeholder)"
    :outlined="hasBorder"
    :clearable="clear"
    :disabled="disabled"
    :required="isRequired"
    :rules="isRequired ? rules.select:[]"
    :placeholder="this.GetLabel(this, placeholder)"
  ></v-select>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'dxFormCombobox',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      required: false
    },
    clear: {
      type: Boolean,
      required: false,
      default: false
    },
    enableClear: {
      type: Boolean,
      default: true
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedValue: {
      type: String,
      required: false
    },
    hasBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      selectedItem: '-1',
      isValid: true,
      rules: {
        select: [(v) => !!v || '*' + this.GetLabel(this, 'required_field') + ' '],
        select2: [(v) => v.length > 0 || '*' + this.GetLabel(this, 'required_field') + ' ']
      }
    }
  },
  created () {
    var _this = this
    var _selectedItem = this.items.find(function (o) {
      return o.value === _this.selectedValue
    })
    if (_selectedItem === undefined || _selectedItem === '' || _selectedItem === 'NaN' || _selectedItem === null) {
      this.selectedItem = ''
    } else {
      this.selectedItem = _selectedItem.value
    }
  },
  watch: {
    selectedValue: function (input) {
      this.$emit('input', input)
      this.selectedItem = input
    },
    selectedItem: function (input) {
      this.$emit('input', input)
    },
    clear: function (input) {
      if (this.$props.enableClear) {
        if (input) {
          this.selectedItem = -1
        }
      }
    }
  },
  validations: {
    selectedItem: {
      required
    }
  },
  methods: {
    validate: function () {
      if (this.isRequired && !this.disabled) {
        if (this.selectedItem === -1) {
          this.isValid = false
          return false
        } else {
          this.isValid = true
          return true
        }
      }
    }
  }
}
</script>

<style>
</style>
