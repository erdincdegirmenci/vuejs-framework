<template>
  <div>
      <h2>{{ value }}</h2>
  </div>
</template>

<script>
export default {
  name: 'dxFormHeader2',
  props: {
    value: {
      type: String,
      required: false
    }
  }
}
</script>
