<template>
  <div>
    <div class="form__section">
      <dxFormLabel class="input-label" :value="name" />
      <span>
        <strong >{{value}}</strong>
      </span>
    </div>
  </div>
</template>

<script>

import dxFormLabel from '../dxFormLabel/dxFormLabel'

export default {
  name: 'dx-str-txt',
  components: {
    dxFormLabel
  },
  props: {
    name: String,
    value: String
  }
}
</script>

<style scoped>

</style>
